"use client";
import { AthleResultsDataGridConfig } from "@/app/athle/components/AthleResultsDataGrid/config/AthleResultsDataGridConfig.interface";
import { getFilterParams } from "@/app/athle/components/AthleResultsDataGrid/utils/getFilterParams";
import { getSortParams } from "@/app/athle/components/AthleResultsDataGrid/utils/getSortParams";
import { adaptResult } from "@/modules/result/adaptResult";
import { GetResultsResponse, Result } from "@/modules/result/result.type";
import { formatTime } from "@/utils/formatTime";
import {
  DataGrid,
  getGridStringOperators,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const columns: GridColDef[] = [
  {
    field: "fullName",
    headerName: "Full name",
    width: 250,
    filterOperators: getGridStringOperators().filter(
      (operator) => operator.value === "contains"
    ),
  },
  { field: "eventType", headerName: "Type", width: 150 },
  {
    field: "score",
    headerName: "Score",
    filterable: false,
    type: "number",
    width: 130,
    valueFormatter: (score) => {
      return formatTime(score);
    },
  },
  {
    field: "eventDate",
    headerName: "Date",
    type: "date",
    width: 130,
    filterable: false,
  },
  { field: "eventLocation", headerName: "Location", width: 130 },
  {
    field: "resultAgeCategory",
    headerName: "Category",
    width: 100,
  },
  {
    field: "athleteYear",
    headerName: "Birth",
    width: 100,
  },
  {
    field: "club",
    headerName: "Club",
    width: 130,
  },
  {
    field: "clubRegion",
    headerName: "Region",
    width: 130,
  },
  {
    field: "clubDepartement",
    headerName: "Department",
    width: 130,
  },
  {
    field: "iaafScore",
    headerName: "IAAF",
    filterable: false,
    type: "number",
    width: 130,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 100,
  },
  {
    field: "nationality",
    headerName: "Nationality",
    width: 130,
  },
];

interface AthleResultsDataGridProps {
  config: AthleResultsDataGridConfig;
}

export const AthleResultsDataGrid = ({ config }: AthleResultsDataGridProps) => {
  const { preFitlters } = config;

  const [rows, setRows] = useState<Result[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 100,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });

  const { sortField, sortOrder } = getSortParams(sortModel);
  const { filterFields, filterValues } = getFilterParams({
    filterModel,
    preFitlters,
  });

  const fetchData = async (page: number, pageSize: number) => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/athle/result/get-results?page=${page}&page-size=${pageSize}&sort-field=${sortField}&sort-order=${sortOrder}&filter-fields=${filterFields}&filter-values=${filterValues}`
    );

    if (!res.ok) {
      return <div>Error fetching data.</div>;
    }

    const data = await res.json();

    const { results, count } = data as GetResultsResponse;
    setRows(results.map(adaptResult));
    setRowCount(count);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel, sortModel, filterModel]);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      paginationMode="server"
      sortingMode="server"
      filterMode="server"
      sortModel={sortModel}
      filterModel={filterModel}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      onSortModelChange={setSortModel}
      onFilterModelChange={setFilterModel}
      rowCount={rowCount}
      loading={loading}
      pageSizeOptions={[10, 25, 100]}
    />
  );
};
