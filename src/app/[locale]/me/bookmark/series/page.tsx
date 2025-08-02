import { useTranslations } from "next-intl";
import React from "react";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Search, Eye, Bookmark, MessageCircle, ChevronDown } from "lucide-react";
import { Badge } from "@/components/shared/Badge";
import DateRangePicker from "@/components/shared/date-picker/date-range-picker";
import { AvatarUser } from "@/components/shared/avatar-user";

const BookMarkSeriesPage = () => {
  const t = useTranslations();

  const bookmarkData = [
    {
      id: "1",
      user: {
        name: "LongNguyen",
        avatar: "/images/avatar1.jpg",
      },
      bookmarkedAt: "thg 2 22, 2023 8:07 SA",
      title: "Lập trình hướng đối tượng OOP",
      tags: ["BE", "OOP", "lập trình hướng đối tượng", "C#", "tìm hiểu lập trình hướng đối tượ..."],
      stats: {
        views: "14.6K",
        bookmarks: "13",
        comments: "0",
      },
      votes: "15",
    },
    {
      id: "2",
      user: {
        name: "Nguyen Cong Son B",
        avatar: null,
      },
      bookmarkedAt: "thg 8 25, 2022 3:36 CH",
      title: "Giới thiệu tổng quan về Angular",
      tags: ["angular"],
      stats: {
        views: "31.4K",
        bookmarks: "8",
        comments: "2",
      },
      votes: "13",
    },
    {
      id: "3",
      user: {
        name: "Nguyen Cong Son C",
        avatar: null,
      },
      bookmarkedAt: "thg 8 25, 2022 3:36 CH",
      title: "Giới thiệu tổng quan về Angular",
      tags: ["angular"],
      stats: {
        views: "31.4K",
        bookmarks: "8",
        comments: "2",
      },
      votes: "13",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="text-subheading">{t("Profile.bookmarkSeries")}</div>
        <div className="text-caption">{t("Profile.bookmarkSeriesDescription")}</div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-4">
        <DateRangePicker />

        <Input placeholder="Thẻ" className="w-54" />

        <div className="flex items-center gap-2 ml-auto">
          <Input placeholder="Tìm kiếm" className="w-64" />
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bookmark List */}
      <div className="divide-y">
        {bookmarkData.map((item) => (
          <div key={item.id} className="p-4 flex gap-2">
            <AvatarUser avatar={item.user.avatar} username={item.user.name} />

            <div>
              <div className="flex items-center gap-1">
                <div className="font-medium text-sm">{item.user.name}</div>
                <div className="text-xs text-muted-foreground">
                  Được bookmark lúc: {item.bookmarkedAt}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{item.stats.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bookmark className="h-4 w-4" />
                    <span>{item.stats.bookmarks}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{item.stats.comments}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookMarkSeriesPage;
