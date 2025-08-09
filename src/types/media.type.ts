import { SuccessRes } from "./common";

export interface Media {
  url: string;
  mimeType: string;
  size: number;
}

export type UploadMediaRes = SuccessRes<Media>;
