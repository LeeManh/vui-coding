"use client";

import React, { useState } from "react";
import {
  Hash,
  Plus,
  Search,
  Edit,
  Trash2,
  FileText,
  TrendingUp,
  Users,
  Eye,
  Grid,
  List,
  BarChart3,
} from "lucide-react";
import { Card } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Badge } from "@/components/shared/Badge";
import Link from "next/link";

const DashboardTagsPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "posts" | "created" | "popularity">("popularity");

  // Mock data for tags with comprehensive metadata
  const tagsWithMeta = [
    {
      id: "1",
      name: "React",
      slug: "react",
      description: "A JavaScript library for building user interfaces",
      color: "#61DAFB",
      postCount: 45,
      seriesCount: 8,
      followers: 1234,
      totalViews: 125430,
      totalLikes: 5670,
      popularityScore: 95,
      createdAt: "2023-01-15",
      lastUsed: "2024-08-08",
      isPopular: true,
      category: "Frontend",
    },
    {
      id: "2",
      name: "JavaScript",
      slug: "javascript",
      description: "The programming language of the web",
      color: "#F7DF1E",
      postCount: 67,
      seriesCount: 12,
      followers: 2156,
      totalViews: 198765,
      totalLikes: 8901,
      popularityScore: 98,
      createdAt: "2022-12-01",
      lastUsed: "2024-08-09",
      isPopular: true,
      category: "Programming",
    },
    {
      id: "3",
      name: "TypeScript",
      slug: "typescript",
      description: "Typed superset of JavaScript",
      color: "#3178C6",
      postCount: 32,
      seriesCount: 5,
      followers: 876,
      totalViews: 87432,
      totalLikes: 3421,
      popularityScore: 87,
      createdAt: "2023-02-10",
      lastUsed: "2024-08-07",
      isPopular: true,
      category: "Programming",
    },
    {
      id: "4",
      name: "Next.js",
      slug: "nextjs",
      description: "The React framework for production",
      color: "#000000",
      postCount: 28,
      seriesCount: 4,
      followers: 654,
      totalViews: 65432,
      totalLikes: 2987,
      popularityScore: 82,
      createdAt: "2023-03-20",
      lastUsed: "2024-08-06",
      isPopular: true,
      category: "Framework",
    },
    {
      id: "5",
      name: "CSS",
      slug: "css",
      description: "Cascading Style Sheets for web design",
      color: "#1572B6",
      postCount: 38,
      seriesCount: 6,
      followers: 789,
      totalViews: 76543,
      totalLikes: 3456,
      popularityScore: 75,
      createdAt: "2022-11-15",
      lastUsed: "2024-08-05",
      isPopular: false,
      category: "Frontend",
    },
    {
      id: "6",
      name: "Node.js",
      slug: "nodejs",
      description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
      color: "#339933",
      postCount: 24,
      seriesCount: 3,
      followers: 543,
      totalViews: 54321,
      totalLikes: 2134,
      popularityScore: 78,
      createdAt: "2023-04-12",
      lastUsed: "2024-08-04",
      isPopular: false,
      category: "Backend",
    },
    {
      id: "7",
      name: "Python",
      slug: "python",
      description: "High-level programming language",
      color: "#3776AB",
      postCount: 19,
      seriesCount: 2,
      followers: 432,
      totalViews: 43210,
      totalLikes: 1987,
      popularityScore: 68,
      createdAt: "2023-05-08",
      lastUsed: "2024-07-28",
      isPopular: false,
      category: "Programming",
    },
    {
      id: "8",
      name: "Vue.js",
      slug: "vuejs",
      description: "The progressive JavaScript framework",
      color: "#4FC08D",
      postCount: 15,
      seriesCount: 2,
      followers: 321,
      totalViews: 32109,
      totalLikes: 1456,
      popularityScore: 65,
      createdAt: "2023-06-22",
      lastUsed: "2024-07-15",
      isPopular: false,
      category: "Framework",
    },
  ];

  const filteredAndSortedTags = tagsWithMeta
    .filter(
      (tag) =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tag.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tag.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "posts":
          return b.postCount - a.postCount;
        case "created":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "popularity":
        default:
          return b.popularityScore - a.popularityScore;
      }
    });

  const totalTags = tagsWithMeta.length;
  const popularTags = tagsWithMeta.filter((tag) => tag.isPopular).length;
  const totalPosts = tagsWithMeta.reduce((sum, tag) => sum + tag.postCount, 0);
  const totalSeries = tagsWithMeta.reduce((sum, tag) => sum + tag.seriesCount, 0);
  const averagePostsPerTag = Math.round(totalPosts / totalTags);

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Hash className="w-5 h-5" />
            Quản lý Tags
          </h1>
          <p className="text-sm text-muted-foreground">
            Quản lý và tổ chức các thẻ tag cho bài viết và series
          </p>
        </div>
        <Link href="/dashboard/tags/create">
          <Button size="sm" className="h-8">
            <Plus className="w-4 h-4 mr-1" />
            Tạo mới
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tổng tags</p>
              <p className="text-xl font-semibold">{totalTags}</p>
            </div>
            <Hash className="w-4 h-4 text-blue-500" />
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Phổ biến</p>
              <p className="text-xl font-semibold">{popularTags}</p>
            </div>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Bài viết</p>
              <p className="text-xl font-semibold">{totalPosts}</p>
            </div>
            <FileText className="w-4 h-4 text-purple-500" />
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Series</p>
              <p className="text-xl font-semibold">{totalSeries}</p>
            </div>
            <BarChart3 className="w-4 h-4 text-orange-500" />
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Theo dõi</p>
              <p className="text-xl font-semibold">
                {Math.round(tagsWithMeta.reduce((sum, tag) => sum + tag.followers, 0) / 1000)}K
              </p>
            </div>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
        </Card>
      </div>

      {/* Controls and Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 relative min-w-48">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Tìm kiếm tags..."
              className="pl-10 h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="h-9 px-3 text-sm border rounded-md"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "name" | "posts" | "created" | "popularity")
            }
          >
            <option value="popularity">Độ phổ biến</option>
            <option value="posts">Số bài viết</option>
            <option value="name">Tên A-Z</option>
            <option value="created">Ngày tạo</option>
          </select>

          <select className="h-9 px-3 text-sm border rounded-md">
            <option value="">Tất cả danh mục</option>
            <option value="programming">Programming</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="framework">Framework</option>
          </select>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              className="h-8"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              className="h-8"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Content */}
      <Card className="p-4">
        {viewMode === "list" ? (
          <div className="space-y-3">
            {filteredAndSortedTags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: tag.color }}
                  ></div>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      <span className="hover:text-primary cursor-pointer">#{tag.name}</span>
                      {tag.isPopular && (
                        <Badge variant="secondary" className="text-xs h-5">
                          Hot
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{tag.description}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="outline" className="text-xs h-6">
                    {tag.category}
                  </Badge>
                  <span className="text-muted-foreground w-12 text-center">{tag.postCount}</span>
                  <span className="text-muted-foreground w-12 text-center">{tag.seriesCount}</span>
                  <span className="text-muted-foreground w-16 text-center">{tag.followers}</span>

                  <div className="flex items-center gap-2 w-20">
                    <div className="w-12 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${tag.popularityScore}%` }}
                      ></div>
                    </div>
                    <span className="text-xs w-8">{tag.popularityScore}%</span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      <Edit className="w-3 h-3 mr-1" />
                      Sửa
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAndSortedTags.map((tag) => (
              <Card key={tag.id} className="p-3">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: tag.color }}
                      ></div>
                      <h4 className="font-medium hover:text-primary cursor-pointer">#{tag.name}</h4>
                    </div>
                    {tag.isPopular && (
                      <Badge variant="secondary" className="text-xs h-5">
                        Hot
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2">{tag.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Danh mục</span>
                    <Badge variant="outline" className="text-xs h-5">
                      {tag.category}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3 text-blue-500" />
                      <span className="text-muted-foreground">{tag.postCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="w-3 h-3 text-green-500" />
                      <span className="text-muted-foreground">{tag.seriesCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-purple-500" />
                      <span className="text-muted-foreground">{tag.followers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-orange-500" />
                      <span className="text-muted-foreground">
                        {Math.round(tag.totalViews / 1000)}K
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-muted-foreground">Phổ biến</span>
                      <span className="text-xs">{tag.popularityScore}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full"
                        style={{ width: `${tag.popularityScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 h-7 text-xs">
                      <Edit className="w-3 h-3 mr-1" />
                      Sửa
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="text-sm text-muted-foreground text-center py-4 border-t mt-4">
          Hiển thị {filteredAndSortedTags.length} trong tổng số {totalTags} tags
        </div>
      </Card>
    </div>
  );
};

export default DashboardTagsPage;
