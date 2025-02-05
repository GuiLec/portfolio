import * as React from "react";

import { AthleResultsDataGrid } from "@/app/athle/components/AthleResultsDataGrid/AthleResultsDataGrid";
import { topIaafScoresConfig } from "@/app/athle/components/AthleResultsDataGrid/config/configs/topIaafScoresConfig";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { AthleEvent } from "@/modules/event/interface";
import { eventMapper } from "@/modules/event/eventMapper";
import { HeroSection } from "@/components/atoms/HeroSection/HeroSection";

const cards = Object.values(AthleEvent).map((event) => ({
  id: event,
  title: eventMapper[event].label,
  href: `/athle/event/${event}`,
}));

const AthlePage = () => {
  const currentYear = new Date().getFullYear();
  const yeartStart = `${currentYear}-01-01`;
  const yearEnd = `${currentYear}-12-31`;
  return (
    <main>
      <HeroSection
        title="Bienvenue sur Running France"
        imageUrl="/images/heroes/jimmy-gressier-semi-marathon-de-paris-2023-running-resultats.jpg"
      />
      <Container sx={{ mt: [2, 5] }}>
        <Typography
          align="center"
          variant="h3"
          component="h2"
          color="primary.main"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          {`Epreuves`}
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(250px, 100%), 1fr))",
            gap: 2,
            mb: 5,
          }}
        >
          {cards.map((card) => (
            <Card key={card.id}>
              <CardActionArea
                component="a"
                href={card.href}
                sx={{
                  height: "100%",
                  "&[data-active]": {
                    backgroundColor: "action.selected",
                    "&:hover": {
                      backgroundColor: "action.selectedHover",
                    },
                  },
                }}
              >
                <CardContent sx={{ height: "100%" }}>
                  <Typography variant="h5" component="div">
                    {card.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
        <Typography
          align="center"
          variant="h3"
          component="h2"
          color="primary.main"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          {`Top performances ${currentYear}`}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ maxWidth: 850, width: "100%", height: 630 }}>
            <AthleResultsDataGrid
              config={topIaafScoresConfig}
              eventFromDate={yeartStart}
              eventToDate={yearEnd}
            />
          </Box>
        </Box>
      </Container>
    </main>
  );
};

export default AthlePage;
