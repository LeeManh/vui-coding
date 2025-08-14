export enum FileType {
  IMAGE = "image",
  VIDEO = "video",
  OTHER = "other",
}

export const ACCEPTED_FILE_TYPES = {
  [FileType.IMAGE]: ["image/*"],
};

export const MAX_FILE_SIZE = {
  [FileType.IMAGE]: 10 * 1024 * 1024, // 10MB
};
