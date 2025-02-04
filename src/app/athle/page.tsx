import * as React from "react";

import { AthleResultsDataGrid } from "@/app/athle/components/AthleResultsDataGrid/AthleResultsDataGrid";
import { topIaafScoresConfig } from "@/app/athle/components/AthleResultsDataGrid/config/configs/topIaafScoresConfig";
import { Box, Typography } from "@mui/material";

const AthlePage = () => {
  return (
    <main>
      <Box sx={{ padding: 2 }}>
        <Typography align="center" variant="h4" component="h1" sx={{ mb: 2 }}>
          Top performances
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ maxWidth: 850, width: "100%", height: 630 }}>
            <AthleResultsDataGrid config={topIaafScoresConfig} />
          </Box>
        </Box>
      </Box>
    </main>
  );
};

export default AthlePage;
