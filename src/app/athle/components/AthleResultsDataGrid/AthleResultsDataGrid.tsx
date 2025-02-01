"use client";
import { GetResultsResponse } from "@/app/api/athle/result/get-results/interface";
import { getFilterParams } from "@/app/athle/components/AthleResultsDataGrid/utils/getFilterParams";
import { getSortParams } from "@/app/athle/components/AthleResultsDataGrid/utils/getSortParams";
import { Result } from "@/modules/result/result.type";
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
    width: 130,
    filterable: false,
  },
  { field: "eventLocation", headerName: "Location", width: 130 },
];

export const AthleResultsDataGrid = () => {
  const [rows, setRows] = useState<Result[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });

  const { sortField, sortOrder } = getSortParams(sortModel);
  const { filterField, filterValue } = getFilterParams(filterModel);

  const fetchData = async (page: number, pageSize: number) => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/athle/result/get-results?page=${page}&page-size=${pageSize}&sort-field=${sortField}&sort-order=${sortOrder}&filter-field=${filterField}&filter-value=${filterValue}`
    );

    if (!res.ok) {
      return <div>Error fetching data.</div>;
    }

    const data = await res.json();

    const { results, count } = data as GetResultsResponse;
    setRows(results);
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
      pagination
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
