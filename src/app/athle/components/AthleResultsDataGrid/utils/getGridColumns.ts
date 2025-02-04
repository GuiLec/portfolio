import { DataGridColumn } from "@/app/athle/components/AthleResultsDataGrid/config/AthleResultsDataGridConfig.interface";
import { gridColumnMapper } from "@/app/athle/components/AthleResultsDataGrid/config/gridColumnMapper";
import { GridColDef } from "@mui/x-data-grid";

export const getGridColumns = (
  configColumns: DataGridColumn[]
): GridColDef[] => {
  return configColumns.map((column) => {
    const gridColumn = gridColumnMapper[column.field];
    return {
      ...gridColumn,
      headerName: column.headerName ?? gridColumn.headerName,
      width: column.width ?? gridColumn.width,
      filterable: column.filterable ?? gridColumn.filterable,
      sortable: column.sortable ?? gridColumn.sortable,
    };
  });
};
