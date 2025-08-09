import { GENDER_LABELS } from "@/constants/user";
import {
  USER_ACTION_LABELS,
  USER_ACTION_TARGET_LABELS,
  UserAction,
  UserActionTarget,
} from "@/constants/actions";
import { Gender } from "@/constants/user";
import { User } from "@/types/user.type";

export function getGenderLabel(gender: Gender) {
  return GENDER_LABELS[gender];
}

export function getActionLabel(action: UserAction) {
  return USER_ACTION_LABELS[action];
}

export function getActionTargetTypeLabel(actionType: UserActionTarget) {
  return USER_ACTION_TARGET_LABELS[actionType];
}

export function getUserDisplayName(
  user: Pick<User, "username" | "displayName"> | null | undefined
) {
  return user?.displayName ?? user?.username;
}
