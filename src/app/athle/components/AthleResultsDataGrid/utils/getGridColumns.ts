import { DataGridColumn } from "@/app/athle/components/AthleResultsDataGrid/config/AthleResultsDataGridConfig.interface";
import { gridColumnMapper } from "@/app/athle/components/AthleResultsDataGrid/config/gridColumnMapper";
import { GridColDef } from "@mui/x-data-grid";

export const getGridColumns = (
  configColumns: DataGridColumn[]
): GridColDef[] => {
  return configColumns.map((column) => ({
    ...gridColumnMapper[column.field],
  }));
};
