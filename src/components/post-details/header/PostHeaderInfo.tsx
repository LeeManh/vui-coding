import React from "react";
import { Post } from "@/types/post.type";
import { Series } from "@/types/series.type";
import { AvatarUser } from "@/components/shared/avatar-user";
import { formatFullDate } from "@/lib/date";
import { calculateReadingTime } from "@/lib/reading-time";
import { useTranslations } from "next-intl";
import { getUserDisplayName } from "@/lib/format";

interface PostHeaderInfoProps {
  data: Post | Series;
}

const PostHeaderInfo = ({ data }: PostHeaderInfoProps) => {
  const t = useTranslations();

  return (
    <div className="space-y-3">
      <h1 className=" text-3xl font-bold">{data?.title}</h1>
      <div className=" text-lg ">{data?.description}</div>
      <div className="flex items-center gap-2">
        <AvatarUser avatar={data?.author.avatar} username={getUserDisplayName(data?.author)} />

        <div className="space-y-1">
          <h3>{getUserDisplayName(data?.author)}</h3>
          <div className="text-xs  line-clamp-1">
            {formatFullDate(data?.createdAt)} •{" "}
            {t("Date.readingTime", {
              readingTime: calculateReadingTime(data?.content ?? ""),
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostHeaderInfo;
