"use client";

import React, { useState } from "react";
import {
  Save,
  Send,
  Calendar as CalendarIcon,
  Tags,
  Image as ImageIcon,
  FileText,
  Settings,
  ArrowLeft,
  X,
  Plus,
} from "lucide-react";
import { Card } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Badge } from "@/components/shared/Badge";
import { Textarea } from "@/components/shared/Textarea";
import { Upload } from "@/components/shared/upload";
import { TiptapEditor } from "@/components/shared/editor/TiptapEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/Select";
import { Calendar } from "@/components/shared/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shared/Popover";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import Link from "next/link";
import useQueryTags from "@/queries/tag/useQueryTags";
import useQuerySeries from "@/queries/series/useQuerySeries";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema, CreatePostFormData, PostStatus, PostVisibility } from "@/schemas/post.schema";

const CreatePostPage = () => {
  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    getValues,
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      tags: [],
      status: PostStatus.DRAFT,
      visibility: PostVisibility.PRIVATE,
      thumbnail: "",
      series: "",
      category: "",
    },
  });

  // Local state for UI interactions
  const [newTag, setNewTag] = useState("");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);

  // Watch form values
  const tags = watch("tags");
  const scheduleDate = watch("scheduledAt");
  const series = watch("series");
  const category = watch("category");
  const status = watch("status");
  const content = watch("content");

  // API hooks
  const { data: tagsData, isLoading: tagsLoading } = useQueryTags();
  const { data: seriesData, isLoading: seriesLoading } = useQuerySeries();

  // Get selected series title for display
  const selectedSeriesTitle =
    series && seriesData?.data ? seriesData.data.find((s) => s.id === series)?.title : null;

  // Function to truncate text
  const truncateText = (text: string, maxLength: number = 40) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.some(tag => tag.name === newTag.trim())) {
      const currentTags = getValues("tags");
      setValue("tags", [...currentTags, { name: newTag.trim() }]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = getValues("tags");
    setValue("tags", currentTags.filter((tag) => tag.name !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleAddExistingTag = (tagName: string) => {
    if (!tags.some(tag => tag.name === tagName)) {
      const currentTags = getValues("tags");
      setValue("tags", [...currentTags, { name: tagName }]);
    }
  };

  const handleSave = async (type: "draft" | "publish" | "schedule") => {
    const formData = getValues();
    
    // Set status based on save type
    let status: PostStatus;
    switch (type) {
      case "draft":
        status = PostStatus.DRAFT;
        break;
      case "publish":
        status = PostStatus.PUBLISHED;
        break;
      case "schedule":
        status = PostStatus.SCHEDULED;
        break;
    }
    
    setValue("status", status);
    
    // Trigger form validation and submission
    handleSubmit(onSubmit)();
  };

  const onSubmit = async (data: CreatePostFormData) => {
    try {
      console.log("Form data:", data);
      // TODO: Call API to create post
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b sticky top-0 z-50 bg-background">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/dashboard/posts">
                <Button variant="ghost" size="sm" className="h-8">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Quay lại
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <h1 className="text-lg font-semibold">Viết bài mới</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => handleSave("draft")}
              >
                <Save className="w-4 h-4 mr-1" />
                Lưu nháp
              </Button>
              <Button size="sm" className="h-8" onClick={() => handleSave("publish")}>
                <Send className="w-4 h-4 mr-1" />
                Xuất bản
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-4">
            {/* Title */}
            <Card className="p-4">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Nhập tiêu đề bài viết..."
                    className="text-xl font-semibold border-none shadow-none p-0 focus-visible:ring-0 placeholder:text-muted-foreground/60"
                    {...field}
                  />
                )}
              />
              {errors.title && (
                <p className="text-destructive text-sm mt-1">{errors.title.message}</p>
              )}
            </Card>

            {/* Featured Image */}
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Ảnh đại diện
              </h3>
              <Upload file={featuredImage} onFileChange={setFeaturedImage} />
            </Card>

            {/* Excerpt */}
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-4">Tóm tắt bài viết</h3>
              <Textarea
                placeholder="Viết tóm tắt ngắn gọn về bài viết..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="h-40 resize-none"
                maxLength={160}
                showCharCount={true}
              />
            </Card>

            {/* Editor */}
            <Card className="p-4">
              <TiptapEditor
                content={content}
                onChange={setContent}
                placeholder="Bắt đầu viết bài của bạn ở đây..."
                className="min-h-[320px]"
                showCharCount={true}
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Publish Options */}
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Tùy chọn xuất bản
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Quyền truy cập</label>
                  <Select
                    value={visibility}
                    onValueChange={(value: string) =>
                      setVisibility(value as "public" | "private" | "protected")
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn quyền truy cập" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Công khai</SelectItem>
                      <SelectItem value="private">Riêng tư</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <CalendarIcon className="w-3 h-3" />
                    Lên lịch xuất bản
                  </label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "flex-1 justify-start text-left font-normal",
                            !scheduleDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {scheduleDate ? (
                            format(scheduleDate, "PPP 'lúc' HH:mm", { locale: vi })
                          ) : (
                            <span>Chọn ngày và giờ</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="p-3 space-y-3">
                          <Calendar
                            mode="single"
                            selected={scheduleDate}
                            onSelect={(date) => {
                              if (date) {
                                // Preserve time if already set, otherwise set to current time
                                const newDate = new Date(date);
                                if (scheduleDate) {
                                  newDate.setHours(scheduleDate.getHours());
                                  newDate.setMinutes(scheduleDate.getMinutes());
                                } else {
                                  const now = new Date();
                                  newDate.setHours(now.getHours());
                                  newDate.setMinutes(now.getMinutes());
                                }
                                setScheduleDate(newDate);
                              }
                            }}
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return date < today;
                            }}
                            initialFocus
                          />
                          {scheduleDate && (
                            <div className="border-t pt-3">
                              <label className="text-sm font-medium mb-2 block">Chọn giờ</label>
                              <div className="flex gap-2">
                                <Select
                                  value={scheduleDate.getHours().toString()}
                                  onValueChange={(value: string) => {
                                    const newDate = new Date(scheduleDate);
                                    newDate.setHours(parseInt(value));
                                    setScheduleDate(newDate);
                                  }}
                                >
                                  <SelectTrigger className="w-20">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from({ length: 24 }, (_, i) => (
                                      <SelectItem key={i} value={i.toString()}>
                                        {i.toString().padStart(2, "0")}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <span className="flex items-center">:</span>
                                <Select
                                  value={scheduleDate.getMinutes().toString()}
                                  onValueChange={(value: string) => {
                                    const newDate = new Date(scheduleDate);
                                    newDate.setMinutes(parseInt(value));
                                    setScheduleDate(newDate);
                                  }}
                                >
                                  <SelectTrigger className="w-20">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from({ length: 60 }, (_, i) => (
                                      <SelectItem key={i} value={i.toString()}>
                                        {i.toString().padStart(2, "0")}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                    {scheduleDate && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 w-9 p-0"
                        onClick={() => setScheduleDate(undefined)}
                        title="Xóa thời gian"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Categories & Series */}
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-4">Phân loại</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Danh mục</label>
                  <div className="flex gap-2">
                    <Select
                      value={category || "none"}
                      onValueChange={(value) => setCategory(value === "none" ? "" : value)}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">
                          <span className="text-muted-foreground">Không chọn danh mục</span>
                        </SelectItem>
                        <SelectItem value="tech">Công nghệ</SelectItem>
                        <SelectItem value="tutorial">Hướng dẫn</SelectItem>
                        <SelectItem value="review">Đánh giá</SelectItem>
                        <SelectItem value="news">Tin tức</SelectItem>
                      </SelectContent>
                    </Select>
                    {category && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 w-9 p-0"
                        onClick={() => setCategory("")}
                        title="Xóa danh mục"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Series</label>
                  <div className="flex gap-2">
                    <div className="flex-1 min-w-0">
                      <Select
                        value={series || "none"}
                        onValueChange={(value) => setSeries(value === "none" ? "" : value)}
                        disabled={seriesLoading}
                      >
                        <SelectTrigger className="w-full" title={selectedSeriesTitle || undefined}>
                          {selectedSeriesTitle ? (
                            <span className="truncate block">
                              {truncateText(selectedSeriesTitle, 45)}
                            </span>
                          ) : (
                            <SelectValue
                              placeholder={seriesLoading ? "Đang tải..." : "Không thuộc series nào"}
                            />
                          )}
                        </SelectTrigger>
                        <SelectContent className="w-[var(--radix-select-trigger-width)]">
                          <SelectItem value="none">
                            <span className="text-muted-foreground">Không thuộc series nào</span>
                          </SelectItem>
                          {seriesData?.data?.map((seriesItem) => (
                            <SelectItem
                              key={seriesItem.id}
                              value={seriesItem.id}
                              title={seriesItem.title}
                            >
                              {truncateText(seriesItem.title, 45)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {series && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 w-9 p-0 flex-shrink-0"
                        onClick={() => setSeries("")}
                        title="Xóa series"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Tags */}
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                <Tags className="w-4 h-4" />
                Thẻ tags
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Thêm tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 h-8 text-sm"
                  />
                  <Button size="sm" className="h-8 w-8 p-0" onClick={handleAddTag}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Suggested tags from API */}
                {!tagsLoading && tagsData?.data && tagsData.data.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Tags có sẵn:</label>
                    <div className="flex flex-wrap gap-1">
                      {tagsData.data
                        .filter((tag) => !tags.includes(tag.name))
                        .slice(0, 10)
                        .map((tag) => (
                          <Button
                            key={tag.id}
                            variant="outline"
                            size="sm"
                            className="h-6 text-xs"
                            onClick={() => handleAddExistingTag(tag.name)}
                          >
                            {tag.name}
                          </Button>
                        ))}
                    </div>
                  </div>
                )}

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs h-6 flex items-center gap-1"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-destructive ml-1 flex items-center justify-center w-4 h-4"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* SEO */}
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-4">SEO</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">URL slug:</span>
                  <span className="text-xs">Auto-generate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Meta description:</span>
                  <span className="text-xs">{excerpt ? "From excerpt" : "Empty"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reading time:</span>
                  <span className="text-xs">~{Math.ceil(content.split(" ").length / 200)} min</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
