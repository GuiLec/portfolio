import { DataGridField } from "@/app/athle/components/AthleResultsDataGrid/config/AthleResultsDataGridConfig.interface";
import { formatTime } from "@/utils/formatTime";
import { getGridStringOperators, GridColDef } from "@mui/x-data-grid";

export const gridColumnMapper: Record<DataGridField, GridColDef> = {
  id: {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  fullName: {
    field: "fullName",
    headerName: "Athlète",
    width: 200,
    filterOperators: getGridStringOperators().filter(
      (operator) => operator.value === "contains"
    ),
    renderCell: (params) => {
      return (
        <a
          href={
            params.row.bilanAthlete
              ? `/athle/athlete/${params.row.bilanAthlete}`
              : undefined
          }
        >
          {params.value}
        </a>
      );
    },
  },
  eventType: {
    field: "eventType",
    headerName: "Epreuve",
    width: 120,
  },
  score: {
    field: "score",
    headerName: "Performance",
    filterable: false,
    type: "number",
    width: 110,
    valueFormatter: (score) => {
      return formatTime(score);
    },
  },
  eventDate: {
    field: "eventDate",
    headerName: "Date",
    type: "date",
    width: 110,
    filterable: false,
  },
  eventLocation: {
    field: "eventLocation",
    headerName: "Lieu",
    width: 130,
  },
  resultAgeCategory: {
    field: "resultAgeCategory",
    headerName: "Catégorie",
    width: 100,
  },
  athleteYear: {
    field: "athleteYear",
    headerName: "Naissance",
    width: 100,
  },
  club: {
    field: "club",
    headerName: "Club",
    width: 130,
  },
  clubRegion: {
    field: "clubRegion",
    headerName: "Région",
    width: 110,
  },
  clubDepartement: {
    field: "clubDepartement",
    headerName: "Département",
    width: 130,
  },
  iaafScore: {
    field: "iaafScore",
    headerName: "IAAF",
    filterable: false,
    type: "number",
    width: 100,
  },
  gender: {
    field: "gender",
    headerName: "M/F",
    width: 70,
  },
  nationality: {
    field: "nationality",
    headerName: "Nationalité",
    width: 130,
  },
  bilanAthlete: {
    field: "bilanAthlete",
    headerName: "Bilan",
    width: 130,
  },
};
