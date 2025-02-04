import { AthleResultsDataGrid } from "@/app/athle/components/AthleResultsDataGrid/AthleResultsDataGrid";
import { getAthleEventPageConfig } from "@/app/athle/components/AthleResultsDataGrid/config/configs/getAthleEventPageConfig";
import { eventMapper } from "@/modules/event/eventMapper";
import { AthleEvent } from "@/modules/event/interface";
import { Container, Typography } from "@mui/material";
import { notFound } from "next/navigation";

interface EventPageProps {
  params: {
    slug: string;
  };
}

const EventPage = ({ params }: EventPageProps) => {
  const { slug } = params;
  if (!Object.values(AthleEvent).includes(slug as AthleEvent)) {
    return notFound();
  }
  const athleEvent = AthleEvent[slug as AthleEvent];

  return (
    <main>
      <Container>
        <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
          {eventMapper[athleEvent].label}
        </Typography>
        <AthleResultsDataGrid
          config={getAthleEventPageConfig({
            athleEvent,
          })}
          eventFromDate="2025-01-01"
          eventToDate={undefined}
        />
      </Container>
    </main>
  );
};

export default EventPage;
