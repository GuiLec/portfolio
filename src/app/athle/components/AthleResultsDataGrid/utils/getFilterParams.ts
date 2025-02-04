import { GridFilterModel } from "@mui/x-data-grid";

export const getFilterParams = (
  filterModel: GridFilterModel
): { filterFields: string; filterValues: string } => {
  if (filterModel.items.length === 0) {
    return { filterFields: "", filterValues: "" };
  }

  const userFilterItem = filterModel.items[0];

  const filterFieldsArray = [userFilterItem.field];
  const filterValuesArray = [userFilterItem.value ?? ""];

  return {
    filterFields: filterFieldsArray.join(","),
    filterValues: filterValuesArray.join(","),
  };
};
