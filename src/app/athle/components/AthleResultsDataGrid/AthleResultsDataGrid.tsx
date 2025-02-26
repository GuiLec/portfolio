"use client";
import { AthleResultsDataGridConfig } from "@/app/athle/components/AthleResultsDataGrid/config/AthleResultsDataGridConfig.interface";
import { getFilterParams } from "@/app/athle/components/AthleResultsDataGrid/utils/getFilterParams";
import { getGridColumns } from "@/app/athle/components/AthleResultsDataGrid/utils/getGridColumns";
import { getSortParams } from "@/app/athle/components/AthleResultsDataGrid/utils/getSortParams";
import { adaptResult } from "@/modules/result/adaptResult";
import { GetResultsResponse, Result } from "@/modules/result/result.type";
import {
  DataGrid,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";

interface AthleResultsDataGridProps {
  config: AthleResultsDataGridConfig;
  eventFromDate?: string;
  eventToDate?: string;
}

export const AthleResultsDataGrid = ({
  config,
  eventFromDate,
  eventToDate,
}: AthleResultsDataGridProps) => {
  const { preFitlters, dataGridColumns, preSort, hideFooter, defaultPageSize } =
    config;

  const columns = getGridColumns(dataGridColumns);

  const [rows, setRows] = useState<Result[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: defaultPageSize,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: preSort.field,
      sort: preSort.order,
    },
  ]);
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
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/api/athle/result/get-results?page=${page}&page-size=${pageSize}&sort-field=${sortField}&sort-order=${sortOrder}&filter-fields=${filterFields}&filter-values=${filterValues}&event-from-date=${encodeURIComponent(
        eventFromDate ?? ""
      )}&event-to-date=${encodeURIComponent(eventToDate ?? "")}`
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
  }, [
    paginationModel,
    sortModel,
    filterModel,
    config,
    eventFromDate,
    eventToDate,
  ]);

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
      hideFooter={hideFooter}
    />
  );
};
