"use client";

import React from "react";
import { FilterHistory } from "@/components/profile/history/filter";
import HistoryTable from "@/components/profile/history/HistoryTable";

const ProfileHistoryPage = () => {
  return (
    <div>
      <FilterHistory />
      <HistoryTable />
    </div>
  );
};

export default ProfileHistoryPage;
