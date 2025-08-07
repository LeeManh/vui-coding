import { CreateBookmarkBody } from "@/types/bookmark.type";
import { apiClient } from "./api-client";

export const createBookmark = (body: CreateBookmarkBody) => apiClient.post("bookmarks", body);
