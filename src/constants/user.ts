export enum UserRole {
  ADMIN = 1,
  USER = 2,
}

export enum Gender {
  MALE = 1,
  FEMALE = 2,
  OTHER = 3,
}

export const GENDER_LABELS = {
  [Gender.MALE]: "Gender.male",
  [Gender.FEMALE]: "Gender.female",
  [Gender.OTHER]: "Gender.other",
} as const;
