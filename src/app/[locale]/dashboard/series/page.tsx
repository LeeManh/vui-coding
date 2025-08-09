"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  TrendingUp,
  Users,
  Grid,
  List,
  FileText,
  Target,
} from "lucide-react";
import { Card } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Badge } from "@/components/shared/Badge";
import Link from "next/link";

const DashboardSeriesPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for series with additional metadata
  const seriesWithMeta = [
    {
      id: "1",
      title: "React Hooks Complete Guide",
      description:
        "Master React Hooks from basics to advanced patterns. Learn useState, useEffect, custom hooks and more.",
      totalPosts: 12,
      publishedPosts: 8,
      draftPosts: 4,
      subscribers: 1847,
      totalViews: 45623,
      totalLikes: 2341,
      totalComments: 567,
      status: "active",
      createdAt: "2024-01-15",
      lastUpdated: "2024-02-20",
      coverImage: "/api/placeholder/300/200",
      tags: ["React", "JavaScript", "Frontend", "Tutorial"],
      difficulty: "Intermediate",
      estimatedReadTime: 180, // total minutes
    },
    {
      id: "2",
      title: "Next.js 14 Mastery",
      description:
        "Complete guide to Next.js 14 with App Router, Server Components, and modern development practices.",
      totalPosts: 8,
      publishedPosts: 6,
      draftPosts: 2,
      subscribers: 1234,
      totalViews: 32145,
      totalLikes: 1876,
      totalComments: 423,
      status: "active",
      createdAt: "2024-02-01",
      lastUpdated: "2024-02-25",
      coverImage: "/api/placeholder/300/200",
      tags: ["Next.js", "React", "Full-stack", "Web Development"],
      difficulty: "Advanced",
      estimatedReadTime: 240,
    },
    {
      id: "3",
      title: "TypeScript Fundamentals",
      description:
        "Learn TypeScript from scratch. Types, interfaces, generics, and advanced TypeScript patterns.",
      totalPosts: 15,
      publishedPosts: 10,
      draftPosts: 5,
      subscribers: 987,
      totalViews: 28976,
      totalLikes: 1543,
      totalComments: 321,
      status: "draft",
      createdAt: "2024-01-10",
      lastUpdated: "2024-02-18",
      coverImage: "/api/placeholder/300/200",
      tags: ["TypeScript", "JavaScript", "Programming"],
      difficulty: "Beginner",
      estimatedReadTime: 200,
    },
    {
      id: "4",
      title: "Modern CSS Techniques",
      description:
        "Explore modern CSS features including Grid, Flexbox, CSS Variables, and advanced animations.",
      totalPosts: 6,
      publishedPosts: 6,
      draftPosts: 0,
      subscribers: 654,
      totalViews: 18234,
      totalLikes: 987,
      totalComments: 234,
      status: "completed",
      createdAt: "2023-12-01",
      lastUpdated: "2024-01-15",
      coverImage: "/api/placeholder/300/200",
      tags: ["CSS", "Frontend", "Design", "Web Development"],
      difficulty: "Intermediate",
      estimatedReadTime: 120,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">Đang tiến hành</Badge>
        );
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Bản nháp</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Hoàn thành</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return (
          <Badge variant="outline" className="text-green-600 border-green-300">
            Cơ bản
          </Badge>
        );
      case "Intermediate":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-300">
            Trung bình
          </Badge>
        );
      case "Advanced":
        return (
          <Badge variant="outline" className="text-red-600 border-red-300">
            Nâng cao
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const filteredSeries = seriesWithMeta.filter(
    (series) =>
      series.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      series.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSeries = seriesWithMeta.length;
  const activeSeries = seriesWithMeta.filter((s) => s.status === "active").length;
  const completedSeries = seriesWithMeta.filter((s) => s.status === "completed").length;
  const draftSeries = seriesWithMeta.filter((s) => s.status === "draft").length;

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Quản lý Series
          </h1>
          <p className="text-sm text-muted-foreground">
            Tạo và quản lý các series bài viết của bạn
          </p>
        </div>
        <Link href="/dashboard/series/create">
          <Button size="sm" className="h-8">
            <Plus className="w-4 h-4 mr-1" />
            Tạo mới
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tổng series</p>
              <p className="text-xl font-semibold">{totalSeries}</p>
            </div>
            <BookOpen className="w-4 h-4 text-blue-500" />
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Đang tiến hành</p>
              <p className="text-xl font-semibold">{activeSeries}</p>
            </div>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Hoàn thành</p>
              <p className="text-xl font-semibold">{completedSeries}</p>
            </div>
            <Target className="w-4 h-4 text-purple-500" />
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Bản nháp</p>
              <p className="text-xl font-semibold">{draftSeries}</p>
            </div>
            <Edit className="w-4 h-4 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Filter and Controls */}
      <Card className="p-4">
        <div className="space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Bộ lọc
          </h3>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm series..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-48"
              />
            </div>

            <select className="h-9 px-3 text-sm border rounded-md">
              <option value="">Tất cả trạng thái</option>
              <option value="active">Đang tiến hành</option>
              <option value="completed">Hoàn thành</option>
              <option value="draft">Bản nháp</option>
            </select>

            <select className="h-9 px-3 text-sm border rounded-md">
              <option value="">Tất cả độ khó</option>
              <option value="beginner">Cơ bản</option>
              <option value="intermediate">Trung bình</option>
              <option value="advanced">Nâng cao</option>
            </select>

            <div className="flex items-center gap-2 ml-auto">
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
        </div>
      </Card>

      {/* Series List/Grid */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Danh sách series ({filteredSeries.length})
          </h3>
        </div>
        {viewMode === "list" ? (
          <div className="space-y-3">
            {filteredSeries.map((series) => (
              <div
                key={series.id}
                className="flex gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="w-16 h-12 bg-muted rounded flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-muted-foreground" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-sm hover:text-primary cursor-pointer">
                        {series.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {series.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(series.status)}
                      {getDifficultyBadge(series.difficulty)}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {series.publishedPosts}/{series.totalPosts} bài
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {series.subscribers} theo dõi
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {series.totalViews.toLocaleString()} lượt xem
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {series.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs h-5">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        <Edit className="w-3 h-3 mr-1" />
                        Sửa
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        Xem
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSeries.map((series) => (
              <Card key={series.id} className="p-3">
                <div className="space-y-3">
                  <div className="w-full h-24 bg-muted rounded flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-muted-foreground" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm line-clamp-2 hover:text-primary cursor-pointer">
                        {series.title}
                      </h4>
                      {getStatusBadge(series.status)}
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {series.description}
                    </p>

                    <div className="flex items-center justify-between">
                      {getDifficultyBadge(series.difficulty)}
                      <span className="text-xs text-muted-foreground">
                        {series.publishedPosts}/{series.totalPosts} bài
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {series.subscribers}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {series.totalViews.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex gap-1 flex-wrap">
                    {series.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs h-5">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 h-7 text-xs">
                      <Edit className="w-3 h-3 mr-1" />
                      Sửa
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 h-7 text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      Xem
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default DashboardSeriesPage;
