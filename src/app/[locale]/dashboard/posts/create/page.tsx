"use client";

import React, { useState } from "react";
import {
  Save,
  Send,
  Calendar,
  Tags,
  Image as ImageIcon,
  Bold,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  FileText,
  Settings,
  Clock,
  ArrowLeft,
  Upload,
  X,
  Plus,
} from "lucide-react";
import { Card } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Badge } from "@/components/shared/Badge";
import Link from "next/link";
import Image from "next/image";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [scheduleDate, setScheduleDate] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private" | "protected">("public");
  const [series, setSeries] = useState("");
  const [category, setCategory] = useState("");

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSave = (type: "draft" | "publish" | "schedule") => {
    // Logic to save post
    console.log("Saving post as:", type);
  };

  const formatButtons = [
    { icon: Bold, tooltip: "Bold", action: () => console.log("Bold") },
    { icon: Italic, tooltip: "Italic", action: () => console.log("Italic") },
    { icon: LinkIcon, tooltip: "Link", action: () => console.log("Link") },
    { icon: Heading1, tooltip: "Heading 1", action: () => console.log("H1") },
    { icon: Heading2, tooltip: "Heading 2", action: () => console.log("H2") },
    { icon: Heading3, tooltip: "Heading 3", action: () => console.log("H3") },
    { icon: List, tooltip: "Bullet List", action: () => console.log("List") },
    { icon: ListOrdered, tooltip: "Ordered List", action: () => console.log("Ordered List") },
    { icon: Quote, tooltip: "Quote", action: () => console.log("Quote") },
    { icon: Code, tooltip: "Code", action: () => console.log("Code") },
    { icon: ImageIcon, tooltip: "Insert Image", action: () => console.log("Image") },
  ];

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
              <Input
                placeholder="Nhập tiêu đề bài viết..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-semibold border-none shadow-none p-0 focus-visible:ring-0 placeholder:text-muted-foreground/60"
              />
            </Card>

            {/* Featured Image */}
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Ảnh đại diện
              </h3>
              {featuredImage ? (
                <div className="relative">
                  <Image
                    src={featuredImage}
                    alt="Featured image"
                    width={600}
                    height={200}
                    className="w-full h-32 object-cover rounded"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                    onClick={() => setFeaturedImage(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Kéo thả ảnh vào đây hoặc click để chọn
                  </p>
                  <Button variant="outline" size="sm" className="h-8">
                    <Upload className="w-4 h-4 mr-1" />
                    Chọn ảnh
                  </Button>
                </div>
              )}
            </Card>

            {/* Excerpt */}
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-4">Tóm tắt bài viết</h3>
              <textarea
                placeholder="Viết tóm tắt ngắn gọn về bài viết..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full h-20 p-3 text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-2">{excerpt.length}/160 ký tự</p>
            </Card>

            {/* Editor */}
            <Card className="p-4">
              <div className="space-y-4">
                {/* Toolbar */}
                <div className="flex items-center gap-1 pb-3 border-b">
                  <div className="flex items-center gap-1 mr-3">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Undo className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Redo className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="h-4 w-px bg-border mr-3" />

                  {formatButtons.slice(0, 6).map((btn, index) => {
                    const IconComponent = btn.icon;
                    return (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={btn.action}
                        title={btn.tooltip}
                      >
                        <IconComponent className="w-4 h-4" />
                      </Button>
                    );
                  })}
                </div>

                {/* Content Editor */}
                <textarea
                  placeholder="Bắt đầu viết bài của bạn ở đây..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-80 p-4 text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                />
              </div>
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
                  <select
                    value={visibility}
                    onChange={(e) =>
                      setVisibility(e.target.value as "public" | "private" | "protected")
                    }
                    className="w-full h-9 px-3 text-sm border rounded-md"
                  >
                    <option value="public">Công khai</option>
                    <option value="private">Riêng tư</option>
                    <option value="protected">Thành viên</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    Lên lịch xuất bản
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full h-9 px-3 text-sm border rounded-md"
                  />
                </div>

                <div className="pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-8 justify-start"
                    onClick={() => handleSave("schedule")}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Lên lịch
                  </Button>
                </div>
              </div>
            </Card>

            {/* Categories & Series */}
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-4">Phân loại</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Danh mục</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-9 px-3 text-sm border rounded-md"
                  >
                    <option value="">Chọn danh mục</option>
                    <option value="tech">Công nghệ</option>
                    <option value="tutorial">Hướng dẫn</option>
                    <option value="review">Đánh giá</option>
                    <option value="news">Tin tức</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Series</label>
                  <select
                    value={series}
                    onChange={(e) => setSeries(e.target.value)}
                    className="w-full h-9 px-3 text-sm border rounded-md"
                  >
                    <option value="">Không thuộc series nào</option>
                    <option value="react-tutorial">React Tutorial</option>
                    <option value="next-js-guide">Next.js Guide</option>
                    <option value="typescript-basics">TypeScript Basics</option>
                  </select>
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
