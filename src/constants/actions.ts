export enum UserAction {
  ALL = "all",
  BOOKMARK = "bookmark",
  DELETE_BOOKMARK = "delete_bookmark",
  UPVOTE = "upvote",
  DOWNVOTE = "downvote",
  UNDO_UPVOTE = "undo_upvote",
  UNDO_DOWNVOTE = "undo_downvote",
  DELETE = "delete",
}

export const USER_ACTION_LABELS = {
  [UserAction.ALL]: "UserAction.all",
  [UserAction.BOOKMARK]: "UserAction.bookmark",
  [UserAction.DELETE_BOOKMARK]: "UserAction.deleteBookmark",
  [UserAction.UPVOTE]: "UserAction.upvote",
  [UserAction.DOWNVOTE]: "UserAction.downvote",
  [UserAction.DELETE]: "UserAction.delete",
  [UserAction.UNDO_UPVOTE]: "UserAction.undoUpvote",
  [UserAction.UNDO_DOWNVOTE]: "UserAction.undoDownvote",
};

export enum UserActionTarget {
  ALL = "all",
  POST = "post",
  SERIES = "series",
  ANSWER = "answer",
  TAG = "tag",
  COMMENT = "comment",
  USER = "user",
}

export const USER_ACTION_TARGET_LABELS = {
  [UserActionTarget.ALL]: "UserActionTarget.all",
  [UserActionTarget.POST]: "UserActionTarget.post",
  [UserActionTarget.SERIES]: "UserActionTarget.series",
  [UserActionTarget.ANSWER]: "UserActionTarget.answer",
  [UserActionTarget.TAG]: "UserActionTarget.tag",
  [UserActionTarget.COMMENT]: "UserActionTarget.comment",
  [UserActionTarget.USER]: "UserActionTarget.user",
};
