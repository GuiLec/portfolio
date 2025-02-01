import { GridFilterModel } from "@mui/x-data-grid";

export const getFilterParams = (
  filterModel: GridFilterModel
): { filterField: string; filterValue: string } => {
  console.log("🚀 ~ filterModel:", filterModel);
  if (filterModel.items.length === 0) {
    return { filterField: "", filterValue: "" };
  }

  const filterItem = filterModel.items[0];
  return { filterField: filterItem.field, filterValue: filterItem.value ?? "" };
};
