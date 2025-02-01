import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

const rows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const columns: GridColDef[] = [
  { field: "fullname", headerName: "Full name", width: 150 },
  { field: "eventdate", headerName: "Date", width: 150 },
];

export const AthleResultsDataGrid = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/athle/result/get-results`
  );
  console.log("🚀 ~ AthleResultsDataGrid ~ res:", res);

  if (!res.ok) {
    return <div>Error fetching data.</div>;
  }

  const data = await res.json();

  const { results } = data;

  return <DataGrid rows={results} columns={columns} />;
};
