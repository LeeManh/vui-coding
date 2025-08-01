import { UserRole } from "@/constants/user";

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export type Author = Pick<User, "id" | "username" | "avatar">;
