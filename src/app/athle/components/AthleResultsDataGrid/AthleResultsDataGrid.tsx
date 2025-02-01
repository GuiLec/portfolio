"use client";
import { GetResultsResponse } from "@/app/api/athle/result/get-results/interface";
import { Result } from "@/modules/result/result.type";
import { formatTime } from "@/utils/formatTime";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const columns: GridColDef[] = [
  { field: "fullName", headerName: "Full name", width: 250 },
  { field: "eventType", headerName: "Type", width: 150 },
  {
    field: "score",
    headerName: "Score",
    width: 130,
    valueFormatter: (score) => {
      return formatTime(score);
    },
  },
  {
    field: "eventDate",
    headerName: "Date",
    width: 130,
  },
  { field: "eventLocation", headerName: "Location", width: 130 },
];

export const AthleResultsDataGrid = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rows, setRows] = useState<Result[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number, pageSize: number) => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/athle/result/get-results?page=${page}&page-size=${pageSize}`
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
  }, [paginationModel]);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pagination
      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={(newPaginationModel) => {
        setPaginationModel(newPaginationModel);
      }}
      rowCount={rowCount}
      loading={loading}
      pageSizeOptions={[10, 25, 100]}
    />
  );
};
