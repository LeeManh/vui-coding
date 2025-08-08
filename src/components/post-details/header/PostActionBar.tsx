import { createBookmark } from "@/apis/bookmark.api";
import { createLike } from "@/apis/like";
import { Button } from "@/components/shared/Button";
import { BookmarkStatus, BookmarkTargetType } from "@/constants/bookmark.constant";
import { LikeTargetType } from "@/constants/like";
import { QUERY_KEYS } from "@/constants/query-keys";
import { ReactionType } from "@/constants/reaction";
import { cn } from "@/lib/utils";
import { Post } from "@/types/post.type";
import { Series } from "@/types/series.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bookmark, MessageCircle, Share, ThumbsDown, ThumbsUp } from "lucide-react";

interface PostActionBarProps {
  data: Post | Series;
  isSeries?: boolean;
}

const PostActionBar = ({ data, isSeries }: PostActionBarProps) => {
  const queryClient = useQueryClient();

  const likeTargetType = isSeries ? LikeTargetType.SERIES : LikeTargetType.POST;
  const bookmarkTargetType = isSeries ? BookmarkTargetType.SERIES : BookmarkTargetType.POST;

  const createLikeMutation = useMutation({
    mutationFn: createLike,
    onSuccess() {
      if (isSeries) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SERIES.DETAIL, data.id] });
      } else {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS.DETAIL, data.id] });
      }
    },
  });

  const createBookmarkMutation = useMutation({
    mutationFn: createBookmark,
    onSuccess() {
      if (isSeries) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SERIES.DETAIL, data.id] });
      } else {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS.DETAIL, data.id] });
      }
    },
  });

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        className={cn(
          "text-xs rounded-full w-[60px] cursor-pointer",
          data?.reaction === ReactionType.LIKE && "text-red-500 hover:text-red-600"
        )}
        onClick={() => {
          createLikeMutation.mutate({
            targetId: data.id,
            targetType: likeTargetType,
            isDislike: false,
          });
        }}
      >
        <ThumbsUp
          className={cn("w-4 h-4", data?.reaction === ReactionType.LIKE && "fill-red-500")}
        />
        <span>{data?.likeCount}</span>
      </Button>
      <Button
        variant="outline"
        className={cn(
          "text-xs rounded-full w-[60px] cursor-pointer",
          data?.reaction === ReactionType.DISLIKE && "text-red-500 hover:text-red-600"
        )}
        onClick={() => {
          createLikeMutation.mutate({
            targetId: data.id,
            targetType: likeTargetType,
            isDislike: true,
          });
        }}
      >
        <ThumbsDown
          className={cn("w-4 h-4", data?.reaction === ReactionType.DISLIKE && "fill-red-500")}
        />
        <span>{data?.dislikeCount}</span>
      </Button>

      <Button
        variant="outline"
        className="rounded-full cursor-pointer"
        onClick={() => {
          document.getElementById("comments-section")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <MessageCircle className="w-4 h-4" />
        <span>{data?.commentCount}</span>
      </Button>
      <Button
        variant="outline"
        className={cn(
          "rounded-full cursor-pointer",
          data?.bookmarkStatus === BookmarkStatus.BOOKMARKED && "text-red-500 hover:text-red-600 "
        )}
        onClick={() => {
          createBookmarkMutation.mutate({
            targetId: data.id,
            targetType: bookmarkTargetType,
          });
        }}
      >
        <Bookmark
          className={cn(
            "w-4 h-4",
            data?.bookmarkStatus === BookmarkStatus.BOOKMARKED && "fill-red-500"
          )}
        />
        <span>{data?.bookmarkCount}</span>
      </Button>
      <Button variant="outline" className="rounded-full cursor-pointer">
        <Share className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default PostActionBar;
