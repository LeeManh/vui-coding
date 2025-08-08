import { GetListSeriesResponse } from "@/types/series.type";
import { apiClient } from "./api-client";

export const getListSeries = async () => apiClient.get<GetListSeriesResponse>("/series");
