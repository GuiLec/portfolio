import { GridSortModel } from "@mui/x-data-grid";

export const getSortParams = ({
  sortModel,
  preSort,
}: {
  sortModel: GridSortModel;
  preSort: {
    field: string;
    order: "asc" | "desc";
  };
}): { sortField: string; sortOrder: "asc" | "desc" } => {
  if (sortModel.length === 0) {
    return { sortField: preSort.field, sortOrder: preSort.order };
  }

  const sortItem = sortModel[0];
  return { sortField: sortItem.field, sortOrder: sortItem.sort ?? "asc" };
};
