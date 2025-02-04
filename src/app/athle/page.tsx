import * as React from "react";

import { AthleResultsDataGrid } from "@/app/athle/components/AthleResultsDataGrid/AthleResultsDataGrid";

const AthlePage = () => {
  return (
    <main>
      <div style={{ height: "100%", width: "100%" }}>
        <AthleResultsDataGrid />
      </div>
    </main>
  );
};

export default AthlePage;
