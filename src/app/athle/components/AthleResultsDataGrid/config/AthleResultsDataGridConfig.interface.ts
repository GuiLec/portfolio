import { Result } from "@/modules/result/result.type";

export interface AthleResultsDataGridConfig {
  preFitlters: DataGridFilter[];
  dataGridColumns: DataGridColumn[];
  preSort: { field: DataGridField; order: "asc" | "desc" };
}

export interface DataGridFilter {
  field: DataGridField;
  value: string;
}

export interface DataGridColumn {
  field: DataGridField;
}

export type DataGridField = keyof Result;
