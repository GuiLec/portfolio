import { GridSortModel } from "@mui/x-data-grid";

export const getSortParams = (
  sortModel: GridSortModel
): { sortField: string; sortOrder: "asc" | "desc" } => {
  if (sortModel.length === 0) {
    return { sortField: "eventdate", sortOrder: "asc" };
  }

  const sortItem = sortModel[0];
  return { sortField: sortItem.field, sortOrder: sortItem.sort ?? "asc" };
};
