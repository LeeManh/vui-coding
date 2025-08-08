import { SuccessRes } from "./common";

export interface SingInBody {
  email: string;
  password: string;
}

export type SingInResponse = SuccessRes<{
  accessToken: string;
  refreshToken: string;
}>;

export interface RegisterBody {
  email: string;
  password: string;
}

export type RegisterResponse = SuccessRes<{
  accessToken: string;
  refreshToken: string;
}>;
