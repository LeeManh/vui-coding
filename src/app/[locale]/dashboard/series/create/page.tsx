"use client";

import React, { useState } from "react";
import {
  Save,
  Send,
  Tags,
  Image as ImageIcon,
  ArrowLeft,
  Upload,
  X,
  Plus,
  BookOpen,
  Settings,
  Target,
  Info,
} from "lucide-react";
import { Card } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Badge } from "@/components/shared/Badge";
import Link from "next/link";
import Image from "next/image";

const CreateSeriesPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">(
    "beginner"
  );
  const [visibility, setVisibility] = useState<"public" | "private" | "protected">("public");
  const [estimatedPosts, setEstimatedPosts] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [prerequisites, setPrerequisites] = useState("");

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

  const handleSave = (saveStatus: "draft" | "active") => {
    console.log("Saving series as:", saveStatus);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b sticky top-0 z-50 bg-background">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/dashboard/series">
                <Button variant="ghost" size="sm" className="h-8">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Quay lại
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <h1 className="text-lg font-semibold">Tạo series mới</h1>
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
              <Button size="sm" className="h-8" onClick={() => handleSave("active")}>
                <Send className="w-4 h-4 mr-1" />
                Tạo series
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Basic Information */}
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Thông tin cơ bản
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Tên series <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Nhập tên series"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-9"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Mô tả ngắn <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Mô tả ngắn gọn series"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    className="h-9"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {shortDescription.length}/120 ký tự
                  </p>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Mô tả chi tiết <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Mô tả chi tiết nội dung series..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-24 p-3 text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {description.length}/500 ký tự
                  </p>
                </div>
              </div>
            </Card>

            {/* Cover Image */}
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Ảnh bìa series
              </h3>
              {coverImage ? (
                <div className="relative">
                  <Image
                    src={coverImage}
                    alt="Series cover"
                    width={600}
                    height={200}
                    className="w-full h-32 object-cover rounded"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0"
                    onClick={() => setCoverImage(null)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded p-8 text-center">
                  <Upload className="w-10 h-10 mx-auto text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Kéo thả ảnh bìa vào đây hoặc click để chọn
                  </p>
                  <Button variant="outline" size="sm" className="h-8">
                    <Upload className="w-4 h-4 mr-1" />
                    Chọn ảnh
                  </Button>
                </div>
              )}
            </Card>

            {/* Learning Details */}
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Chi tiết học tập
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Đối tượng mục tiêu
                  </label>
                  <textarea
                    placeholder="Mô tả ai sẽ hưởng lợi từ series này"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full h-16 p-3 text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Kiến thức cần có
                  </label>
                  <textarea
                    placeholder="Liệt kê kiến thức người đọc cần có"
                    value={prerequisites}
                    onChange={(e) => setPrerequisites(e.target.value)}
                    className="w-full h-16 p-3 text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Series Settings */}
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Cài đặt series
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Độ khó</label>
                  <div className="space-y-2">
                    {[
                      { value: "beginner", label: "Cơ bản" },
                      { value: "intermediate", label: "Trung bình" },
                      { value: "advanced", label: "Nâng cao" },
                    ].map((level) => (
                      <label
                        key={level.value}
                        className="flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="difficulty"
                          value={level.value}
                          checked={difficulty === level.value}
                          onChange={(e) =>
                            setDifficulty(
                              e.target.value as "beginner" | "intermediate" | "advanced"
                            )
                          }
                          className="w-3 h-3"
                        />
                        {level.label}
                      </label>
                    ))}
                  </div>
                </div>

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
                  <label className="text-sm text-muted-foreground mb-2 block">Số bài dự kiến</label>
                  <Input
                    type="number"
                    placeholder="10"
                    value={estimatedPosts}
                    onChange={(e) => setEstimatedPosts(e.target.value)}
                    className="h-9"
                    min="1"
                    max="100"
                  />
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
                          className="hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="text-xs text-muted-foreground">Tags phổ biến:</div>
                <div className="flex flex-wrap gap-1">
                  {["React", "JavaScript", "TypeScript", "Next.js"].map((suggestedTag) => (
                    <button
                      key={suggestedTag}
                      onClick={() => {
                        if (!tags.includes(suggestedTag)) {
                          setTags([...tags, suggestedTag]);
                        }
                      }}
                      className="text-xs px-2 py-1 bg-muted hover:bg-muted-foreground/10 rounded transition-colors"
                    >
                      {suggestedTag}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSeriesPage;
