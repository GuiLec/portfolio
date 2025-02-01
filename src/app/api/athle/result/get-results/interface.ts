import { Result } from "@/modules/result/result.type";

export interface GetResultsResponse {
  results: Result[];
  count: number;
  length: number;
}
