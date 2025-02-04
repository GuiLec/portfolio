import { AthleResultsDataGridConfig } from "@/app/athle/components/AthleResultsDataGrid/config/AthleResultsDataGridConfig.interface";
import { eventMapper } from "@/modules/event/eventMapper";
import { AthleEvent } from "@/modules/event/interface";

export const getAthleEventPageConfig = ({
  athleEvent,
}: {
  athleEvent: AthleEvent;
}): AthleResultsDataGridConfig => ({
  preFitlters: [
    {
      field: "eventType",
      value: eventMapper[athleEvent].eventType,
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
      field: "eventLocation",
    },
    {
      field: "eventDate",
    },
    {
      field: "club",
    },
    {
      field: "resultAgeCategory",
    },
    {
      field: "clubRegion",
    },
    {
      field: "clubDepartement",
    },
    {
      field: "iaafScore",
    },
  ],
  preSort: { field: "eventDate", order: "desc" },
  defaultPageSize: 25,
});
