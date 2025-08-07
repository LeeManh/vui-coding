import { MetaData, SuccessRes } from "./common";

export interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export type ListTagRes = SuccessRes<Tag[]> & { meta: MetaData };
