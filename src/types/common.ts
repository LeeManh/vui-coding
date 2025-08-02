import { HttpStatus } from "../constants/http-status";

export interface SuccessRes<T> {
  message: string;
  statusCode: HttpStatus;
  data: T;
}

export interface ErrorRes {
  message: string;
  statusCode: HttpStatus;
  errors?: unknown;
}

export interface MetaData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
