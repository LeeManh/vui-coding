import { GetDetailSeriesResponse, GetListSeriesResponse } from "@/types/series.type";
import { apiClient } from "./api-client";

export const getListSeries = async () => apiClient.get<GetListSeriesResponse>("/series");
export const getDetailSeries = async (seriesId: string) =>
  apiClient.get<GetDetailSeriesResponse>(`/series/${seriesId}`);
