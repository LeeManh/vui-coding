import { BookmarkTargetType } from "@/constants/bookmark.constant";

export interface CreateBookmarkBody {
  targetId: string;
  targetType: BookmarkTargetType;
}
