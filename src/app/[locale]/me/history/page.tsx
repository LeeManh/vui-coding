"use client";

import React from "react";
import { FilterHistory } from "@/components/profile/history/filter";
import HistoryTable from "@/components/profile/history/HistoryTable";
import { useTranslations } from "next-intl";

const ProfileHistoryPage = () => {
  const t = useTranslations();

  return (
    <div>
      <div className="mb-4">
        <div className="text-subheading">{t("Profile.history")}</div>
        <div className="text-caption">{t("Profile.historyDescription")}</div>
      </div>

      <FilterHistory />
      <HistoryTable />
    </div>
  );
};

export default ProfileHistoryPage;
