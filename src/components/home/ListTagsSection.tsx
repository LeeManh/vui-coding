"use client";

import React from "react";
import { TitleSection } from "../shared/title-section";
import useQueryTags from "@/queries/tag/useQueryTags";
import { useTranslations } from "next-intl";
import ListTags from "../shared/tags/ListTags";

const ListTagsSection = () => {
  const t = useTranslations();
  const { data } = useQueryTags();

  return (
    <div className="p-2">
      <TitleSection title={t("Common.tags")} />

      <div className="flex flex-wrap gap-2 mt-4">
        <ListTags tags={data?.data} isLoading={!data} />
      </div>
    </div>
  );
};

export default ListTagsSection;
