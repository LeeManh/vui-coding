import { GENDER_LABELS } from "@/constants/user";
import {
  USER_ACTION_LABELS,
  USER_ACTION_TYPE_LABELS,
  UserAction,
  UserActionType,
} from "@/constants/actions";
import { Gender } from "@/constants/user";

export function getGenderLabel(gender: Gender) {
  return GENDER_LABELS[gender];
}

export function getActionLabel(action: UserAction) {
  return USER_ACTION_LABELS[action];
}

export function getActionTypeLabel(actionType: UserActionType) {
  return USER_ACTION_TYPE_LABELS[actionType];
}
