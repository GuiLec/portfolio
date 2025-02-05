import { Container, Typography } from "@mui/material";

interface EventPageProps {
  params: {
    bilanId: string;
  };
}

const EventPage = ({ params }: EventPageProps) => {
  const { bilanId } = params;

  return (
    <main>
      <Container sx={{ mt: [2, 5] }}>
        <Typography
          variant="h2"
          component="h1"
          color="primary.main"
          sx={{ mb: 2 }}
          fontWeight="bold"
        >
          {bilanId}
        </Typography>
      </Container>
    </main>
  );
};

export default EventPage;
