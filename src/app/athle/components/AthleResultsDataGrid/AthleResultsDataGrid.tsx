import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "fullname", headerName: "Full name", width: 250 },
  { field: "eventdate", headerName: "Date", width: 100 },
];

export const AthleResultsDataGrid = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/athle/result/get-results`
  );

  if (!res.ok) {
    return <div>Error fetching data.</div>;
  }

  const data = await res.json();

  const { results } = data;

  return <DataGrid rows={results} columns={columns} />;
};
