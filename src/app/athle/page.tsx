import * as React from "react";

import { AthleResultsDataGrid } from "@/app/athle/components/AthleResultsDataGrid/AthleResultsDataGrid";
import { exampleConfig } from "@/app/athle/components/AthleResultsDataGrid/config/exampleConfig";

const AthlePage = () => {
  return (
    <main>
      <div style={{ height: "100%", width: "100%" }}>
        <AthleResultsDataGrid config={exampleConfig} />
      </div>
    </main>
  );
};

export default AthlePage;
