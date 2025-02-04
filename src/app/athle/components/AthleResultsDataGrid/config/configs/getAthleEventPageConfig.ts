import { AthleResultsDataGridConfig } from "@/app/athle/components/AthleResultsDataGrid/config/AthleResultsDataGridConfig.interface";
import { AthleEvent } from "@/modules/event/interface";

export const getAthleEventPageConfig = ({
  athleEvent,
}: {
  athleEvent: AthleEvent;
}): AthleResultsDataGridConfig => ({
  preFitlters: [],
  dataGridColumns: [
    {
      field: "fullName",
    },
    {
      field: "score",
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
  preSort: { field: "eventDate", order: "desc" },
  defaultPageSize: 25,
});
