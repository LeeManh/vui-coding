export enum UserAction {
  ALL = "all",
  BOOKMARK = "bookmark",
  DELETE_BOOKMARK = "delete_bookmark",
  UPVOTE = "upvote",
  DOWNVOTE = "downvote",
  UNVOTE = "unvote",
  ACCEPT = "accept",
  DELETE = "delete",
}

export const USER_ACTION_LABELS = {
  [UserAction.ALL]: "UserAction.all",
  [UserAction.BOOKMARK]: "UserAction.bookmark",
  [UserAction.DELETE_BOOKMARK]: "UserAction.deleteBookmark",
  [UserAction.UPVOTE]: "UserAction.upvote",
  [UserAction.DOWNVOTE]: "UserAction.downvote",
  [UserAction.UNVOTE]: "UserAction.unvote",
  [UserAction.ACCEPT]: "UserAction.accept",
  [UserAction.DELETE]: "UserAction.delete",
};
export enum UserActionType {
  ALL = "all",
  POST = "post",
  QUESTION = "question",
  SERIES = "series",
  ORGANIZATION = "organization",
  ANSWER = "answer",
  TAG = "tag",
  COMMENT = "comment",
  USER = "user",
}

export const USER_ACTION_TYPE_LABELS = {
  [UserActionType.ALL]: "UserActionType.all",
  [UserActionType.POST]: "UserActionType.post",
  [UserActionType.QUESTION]: "UserActionType.question",
  [UserActionType.SERIES]: "UserActionType.series",
  [UserActionType.ORGANIZATION]: "UserActionType.organization",
  [UserActionType.ANSWER]: "UserActionType.answer",
  [UserActionType.TAG]: "UserActionType.tag",
  [UserActionType.COMMENT]: "UserActionType.comment",
  [UserActionType.USER]: "UserActionType.user",
};
