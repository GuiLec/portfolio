import {
  DataGridField,
  DataGridFilter,
} from "@/app/athle/components/AthleResultsDataGrid/config/AthleResultsDataGridConfig.interface";
import { GridFilterModel } from "@mui/x-data-grid";

export const getFilterParams = ({
  filterModel,
  preFitlters,
}: {
  filterModel: GridFilterModel;
  preFitlters: DataGridFilter[];
}): { filterFields: string; filterValues: string } => {
  const filterFieldsArray = [...preFitlters.map((f) => f.field)];
  const filterValuesArray = [...preFitlters.map((f) => f.value)];
  if (filterModel.items.length > 0) {
    const userFilterItem = filterModel.items[0];
    filterFieldsArray.push(userFilterItem.field as DataGridField);
    filterValuesArray.push(userFilterItem.value);
  }

  return {
    filterFields: filterFieldsArray.join(","),
    filterValues: filterValuesArray.join(","),
  };
};
