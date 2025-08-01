// export enum ReactionType {
//   LIKE,
// }

export enum ReactionTarget {
  POST,
  COMMENT,
}

export interface ToggleReactionParams {
  targetId: string;
  targetType: ReactionTarget;
  // type?: ReactionType;
}
