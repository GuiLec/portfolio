import { AthleResultsDataGridConfig } from "@/app/athle/components/AthleResultsDataGrid/config/AthleResultsDataGridConfig.interface";

export const exampleConfig: AthleResultsDataGridConfig = {
  preFitlters: [
    {
      field: "eventLocation",
      value: "Marrakech",
    },
    {
      field: "eventType",
      value: "1/2 Marathon",
    },
    {
      field: "resultAgeCategory",
      value: "VEF",
    },
  ],
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
