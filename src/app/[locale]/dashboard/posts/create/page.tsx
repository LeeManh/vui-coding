"use client";

import React from "react";
import {
  Save,
  Send,
  Calendar as CalendarIcon,
  Tags,
  Image as ImageIcon,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { Card } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Textarea } from "@/components/shared/Textarea";
import { Select, SelectTrigger, SelectValue } from "@/components/shared/Select";
import { Calendar } from "@/components/shared/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shared/Popover";
import Link from "next/link";
import { Upload } from "@/components/shared/upload";
import { ACCEPTED_FILE_TYPES, FileType, MAX_FILE_SIZE } from "@/constants/file.constant";
import { SimpleEditor } from "@/components/tiptap/tiptap-templates/simple/simple-editor";

const CreatePostPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <form onSubmit={() => {}}>
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
                <Button type="button" variant="outline" size="sm" className="h-8">
                  <Save className="w-4 h-4 mr-1" />
                  Lưu nháp
                </Button>
                <Button type="button" size="sm" className="h-8">
                  <Send className="w-4 h-4 mr-1" />
                  Xuất bản
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Editor */}
              <div className="lg:col-span-2 space-y-4">
                {/* Title */}
                <Card className="p-4">
                  <Input
                    placeholder="Nhập tiêu đề bài viết..."
                    className="text-xl font-semibold border-none shadow-none p-0 focus-visible:ring-0 placeholder:text-muted-foreground/60"
                  />
                </Card>

                {/* Featured Image */}
                <Card className="p-4">
                  <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Ảnh đại diện
                  </h3>
                  <Upload
                    maxFiles={1}
                    maxFileSize={MAX_FILE_SIZE[FileType.IMAGE]}
                    acceptedFileTypes={ACCEPTED_FILE_TYPES[FileType.IMAGE]}
                  >
                    <Upload.Dropzone />
                    <Upload.List />
                  </Upload>
                </Card>

                {/* Description */}
                <Card className="p-4">
                  <h3 className="text-sm font-medium mb-4">Mô tả ngắn</h3>
                  <Textarea
                    placeholder="Viết mô tả ngắn cho bài viết..."
                    maxLength={200}
                    showCharCount
                    className="h-44"
                  />
                </Card>

                {/* Content Editor */}
                <Card className="p-4">
                  <h3 className="text-sm font-medium mb-4">Nội dung</h3>
                  <SimpleEditor />
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Publish Settings */}
                <Card className="p-4">
                  <h3 className="text-sm font-medium mb-4">Cài đặt xuất bản</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Hiển thị</label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Lên lịch xuất bản
                      </label>
                      <div className="flex gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="flex-1 justify-start text-left font-normal"
                              type="button"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <div className="p-3 space-y-3">
                              <Calendar mode="single" />
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Categories & Series */}
                <Card className="p-4">
                  <h3 className="text-sm font-medium mb-4">Phân loại</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Series</label>
                      <div className="flex gap-2">
                        <div className="flex-1 min-w-0">Select</div>
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
                  <div className="space-y-3"></div>
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
                      <span className="text-xs">From description</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reading time:</span>
                      <span className="text-xs">100 min</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
