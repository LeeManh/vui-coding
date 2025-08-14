"use client";

import React, { useState } from "react";
import { Hash, ArrowLeft, Save, Eye, Send, Palette, Info, Check, X, Plus } from "lucide-react";
import { Card } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Badge } from "@/components/shared/Badge";
import Link from "next/link";

const CreateTagPage = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#3B82F6");
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private" | "protected">("public");
  const [isPopular, setIsPopular] = useState(false);
  const [relatedTags, setRelatedTags] = useState<string[]>([]);
  const [newRelatedTag, setNewRelatedTag] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);

  // Predefined color palette
  const colorPalette = [
    "#3B82F6", // Blue
    "#EF4444", // Red
    "#10B981", // Green
    "#F59E0B", // Yellow
    "#8B5CF6", // Purple
    "#F97316", // Orange
    "#06B6D4", // Cyan
    "#84CC16", // Lime
    "#EC4899", // Pink
    "#6B7280", // Gray
    "#1F2937", // Dark Gray
    "#DC2626", // Dark Red
  ];

  // Auto-generate slug from name
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (autoSlug) {
      setSlug(generateSlug(value));
    }
  };

  const handleAddRelatedTag = () => {
    if (newRelatedTag.trim() && !relatedTags.includes(newRelatedTag.trim())) {
      setRelatedTags([...relatedTags, newRelatedTag.trim()]);
      setNewRelatedTag("");
    }
  };

  const handleRemoveRelatedTag = (tagToRemove: string) => {
    setRelatedTags(relatedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddRelatedTag();
    }
  };

  const handleSave = (saveType: "draft" | "active") => {
    console.log("Saving tag as:", saveType);
    // Handle save logic here
  };

  const isValidSlug = slug.match(/^[a-z0-9-]+$/);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b sticky top-0 z-50 bg-background">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/dashboard/tags">
                <Button variant="ghost" size="sm" className="h-8">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Quay lại
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Hash className="w-5 h-5" />
                <h1 className="text-lg font-semibold">Tạo tag mới</h1>
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
                Tạo tag
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
                    Tên tag <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Nhập tên tag"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="h-9"
                  />
                  {name && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Tag sẽ hiển thị: <span className="">#{name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    Slug (URL) <span className="text-red-500">*</span>
                    <label className="flex items-center gap-1 text-xs font-normal cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoSlug}
                        onChange={(e) => setAutoSlug(e.target.checked)}
                        className="w-3 h-3"
                      />
                      Tự động
                    </label>
                  </label>
                  <Input
                    placeholder="tag-slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    disabled={autoSlug}
                    className={`h-9  ${!isValidSlug && slug ? "border-red-500" : ""}`}
                  />
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">
                      URL: <span className=" text-blue-600">/tags/{slug}</span>
                    </p>
                    {slug && (
                      <div className="flex items-center gap-1">
                        {isValidSlug ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <Check className="w-3 h-3" />
                            <span className="text-xs">Hợp lệ</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-600">
                            <X className="w-3 h-3" />
                            <span className="text-xs">Chỉ chấp nhận a-z, 0-9, dấu gạch ngang</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Mô tả <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Mô tả ngắn gọn về tag này"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-20 p-3 text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {description.length}/160 ký tự
                  </p>
                </div>
              </div>
            </Card>

            {/* Color and Visual */}
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Màu sắc tag
              </h3>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {colorPalette.map((paletteColor) => (
                    <button
                      key={paletteColor}
                      onClick={() => setColor(paletteColor)}
                      className={`w-6 h-6 rounded border-2 transition-all ${
                        color === paletteColor ? "border-gray-400 scale-110" : "border-gray-200"
                      }`}
                      style={{ backgroundColor: paletteColor }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-8 h-8 border rounded cursor-pointer"
                  />
                  <Input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="#3B82F6"
                    className=" w-24 h-8 text-sm"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Xem trước:</span>
                    <Badge style={{ backgroundColor: color, color: "#fff" }} className="h-6">
                      #{name || "tag"}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Related Tags */}
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                <Hash className="w-4 h-4" />
                Tags liên quan
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Thêm tag liên quan..."
                    value={newRelatedTag}
                    onChange={(e) => setNewRelatedTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 h-8 text-sm"
                  />
                  <Button size="sm" className="h-8 w-8 p-0" onClick={handleAddRelatedTag}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {relatedTags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {relatedTags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs h-6 flex items-center gap-1"
                      >
                        #{tag}
                        <button
                          onClick={() => handleRemoveRelatedTag(tag)}
                          className="hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Tag Settings */}
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                <Hash className="w-4 h-4" />
                Cài đặt tag
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Danh mục</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-9 px-3 text-sm border rounded-md"
                  >
                    <option value="">Chọn danh mục</option>
                    <option value="programming">Programming</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="framework">Framework</option>
                    <option value="tools">Tools</option>
                    <option value="design">Design</option>
                    <option value="other">Khác</option>
                  </select>
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
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="checkbox"
                      checked={isPopular}
                      onChange={(e) => setIsPopular(e.target.checked)}
                      className="w-3 h-3"
                    />
                    Tag phổ biến
                  </label>
                </div>
              </div>
            </Card>

            {/* Preview */}
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Xem trước
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tên:</span>
                  <Badge style={{ backgroundColor: color, color: "#fff" }} className="h-5">
                    #{name || "tag"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Slug:</span>
                  <span className=" text-xs">{slug || "tag-slug"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Danh mục:</span>
                  <span>
                    {category ? (
                      <Badge variant="outline" className="text-xs h-5">
                        {category}
                      </Badge>
                    ) : (
                      "Chưa chọn"
                    )}
                  </span>
                </div>
                {isPopular && (
                  <div className="flex justify-center">
                    <Badge variant="secondary" className="text-xs h-5">
                      Hot
                    </Badge>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTagPage;
