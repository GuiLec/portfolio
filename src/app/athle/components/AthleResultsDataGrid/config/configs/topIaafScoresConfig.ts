import { AthleResultsDataGridConfig } from "@/app/athle/components/AthleResultsDataGrid/config/AthleResultsDataGridConfig.interface";

export const topIaafScoresConfig: AthleResultsDataGridConfig = {
  preFitlters: [],
  dataGridColumns: [
    {
      field: "fullName",
    },
    {
      field: "score",
    },
    {
      field: "eventType",
    },
    {
      field: "gender",
    },
    {
      field: "eventLocation",
    },
    {
      field: "eventDate",
    },
    {
      field: "iaafScore",
    },
  ],
  preSort: { field: "iaafScore", order: "desc" },
  defaultPageSize: 10,
};
