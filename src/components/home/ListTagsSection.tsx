"use client";

import React from "react";
import { TitleSection } from "../shared/title-section";
import useQueryTags from "@/queries/tag/useQueryTags";
import TagBadge from "../shared/tags/TagBadge";
import { useTranslations } from "next-intl";

const ListTagsSection = () => {
  const t = useTranslations();
  const { data } = useQueryTags();

  return (
    <div className="p-2">
      <TitleSection title={t("Common.tags")} />

      <div className="flex flex-wrap gap-2 mt-4">
        {data?.data.map((tag) => (
          <TagBadge key={tag.id}>{tag.name}</TagBadge>
        ))}
      </div>
    </div>
  );
};

export default ListTagsSection;
