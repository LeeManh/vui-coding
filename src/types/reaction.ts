export enum ReactionTarget {
  POST,
  COMMENT,
}

export interface ToggleReactionParams {
  targetId: string;
  targetType: ReactionTarget;
}
