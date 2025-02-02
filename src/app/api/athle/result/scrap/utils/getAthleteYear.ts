export const getAthleteYear = (rawAthleteYear?: string | null): number => {
  if (!rawAthleteYear) {
    return 0;
  }

  const athleteYear = Number(rawAthleteYear);

  if (rawAthleteYear.length > 2) return athleteYear;
  // if Number(rawAthleteYear) is > the number of the last 2 digit of the current year
  // then the athlete was born in the 20th century
  // else the athlete was born in the 21st century
  const currentYear = new Date().getFullYear();
  const lastTwoDigitsOfCurrentYear = Number(currentYear.toString().slice(-2));

  if (athleteYear > lastTwoDigitsOfCurrentYear) {
    return 1900 + athleteYear;
  }

  return 2000 + athleteYear;
};
