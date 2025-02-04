import { Result } from "@/modules/result/result.type";

export interface AthleResultsDataGridConfig {
  preFitlters: DataGridFilter[];
  dataGridColumns: DataGridColumn[];
  preSort: { field: DataGridField; order: "asc" | "desc" };
  hideFooter?: boolean;
  defaultPageSize: number;
}

export interface DataGridFilter {
  field: DataGridField;
  value: string;
}

export interface DataGridColumn {
  field: DataGridField;
  headerName?: string;
  width?: number;
  filterable?: boolean;
  sortable?: boolean;
}

export type DataGridField = keyof Result;
