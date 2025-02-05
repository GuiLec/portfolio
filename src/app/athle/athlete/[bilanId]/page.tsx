import { Container, Typography } from "@mui/material";

interface EventPageProps {
  params: {
    bilanId: string;
  };
}

const EventPage = async ({ params }: EventPageProps) => {
  const { bilanId } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/athle/scrap/athlete?bilan-athlete-id=${bilanId}`
  );

  if (!res.ok) {
    return <div>Error fetching data.</div>;
  }

  const data = await res.json();

  const { athlete } = data;

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
          {athlete.fullName}
        </Typography>
      </Container>
    </main>
  );
};

export default EventPage;
