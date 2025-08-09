"use client";

import React from "react";
import { FilterHistory } from "@/components/profile/history/filter";
import HistoryTable from "@/components/profile/history/HistoryTable";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { History, Activity, TrendingUp, Calendar } from "lucide-react";

const ProfileHistoryPage = () => {
  const t = useTranslations();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3">
          <History className="w-8 h-8 text-primary" />
          {t("Profile.history")}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t("Profile.historyDescription")}
        </p>
      </div>

      {/* Activity Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-blue-200 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-400">
              Tổng hoạt động
            </CardTitle>
            <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-300">1,247</div>
            <p className="text-xs text-blue-700 dark:text-blue-400">+12% so với tháng trước</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-green-50/50 dark:bg-green-900/10 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800 dark:text-green-400">
              Hoạt động tuần này
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-300">89</div>
            <p className="text-xs text-green-700 dark:text-green-400">+8% so với tuần trước</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-purple-50/50 dark:bg-purple-900/10 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-400">
              Hoạt động hôm nay
            </CardTitle>
            <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-300">12</div>
            <p className="text-xs text-purple-700 dark:text-purple-400">
              Bao gồm: đọc, like, comment
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Bộ lọc hoạt động
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FilterHistory />
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Lịch sử hoạt động
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6">
          <HistoryTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileHistoryPage;
