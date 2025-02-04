"use client";
import { AthleResultsDataGrid } from "@/app/athle/components/AthleResultsDataGrid/AthleResultsDataGrid";
import { getAthleEventPageConfig } from "@/app/athle/components/AthleResultsDataGrid/config/configs/getAthleEventPageConfig";
import { SelectInput } from "@/components/atoms/SelectInput/SelectInput";
import { eventMapper } from "@/modules/event/eventMapper";
import { AthleEvent } from "@/modules/event/interface";
import { Container, Stack, Typography } from "@mui/material";
import { notFound } from "next/navigation";
import { useState } from "react";

interface EventPageProps {
  params: {
    slug: string;
  };
}

const genderOptions = [
  { value: "mixt", label: "Mixte" },
  { value: "F", label: "Femmes" },
  { value: "M", label: "Hommes" },
];

const yearOptions = [
  { value: "all", label: "All" },
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
];

const EventPage = ({ params }: EventPageProps) => {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedGender, setSelectedGender] = useState<string>("mixt");
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
        <Stack direction={{ xs: "column", sm: "row" }} mb={2} spacing={2}>
          <SelectInput
            label="Sexe"
            labelId="select-gender-label"
            options={genderOptions}
            value={selectedGender}
            onChange={setSelectedGender}
          />
          <SelectInput
            label="Année"
            labelId="select-year-label"
            options={yearOptions}
            value={selectedYear}
            onChange={setSelectedYear}
          />
        </Stack>
        <AthleResultsDataGrid
          config={getAthleEventPageConfig({
            athleEvent,
            gender: selectedGender,
          })}
          eventFromDate={getFromAndEndDates(selectedYear).from}
          eventToDate={getFromAndEndDates(selectedYear).to}
        />
      </Container>
    </main>
  );
};

const getFromAndEndDates = (year: string) => {
  if (year === "all") {
    return { from: undefined, to: undefined };
  }
  return { from: `${year}-01-01`, to: `${year}-12-31` };
};

export default EventPage;
