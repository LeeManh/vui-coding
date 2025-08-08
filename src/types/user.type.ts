import { UserRole } from "@/constants/user";
import { SuccessRes } from "./common";

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  avatar: string | null;
  displayName: string | null;
  birthDay: string | null;
  gender: string | null;
  createdAt: string;
  updatedAt: string;
}

export type Author = Pick<User, "id" | "username" | "avatar" | "displayName">;

export interface UpdateMeBody {
  avatar?: string | null;
  displayName?: string | null;
  birthDay?: string | null;
  gender?: number | null;
}

export type GetMeResponse = SuccessRes<User>;
