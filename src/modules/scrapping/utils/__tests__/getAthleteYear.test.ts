import { getAthleteYear } from "@/modules/scrapping/utils/getAthleteYear";

// Should mock date, but flemme
describe("getAthleteYear", () => {
  it.each`
    rawAthleteYear | expected
    ${"00"}        | ${2000}
    ${"01"}        | ${2001}
    ${"99"}        | ${1999}
    ${"100"}       | ${100}
    ${"2021"}      | ${2021}
    ${"1992"}      | ${1992}
  `(
    "should return $expected when rawAthleteYear is $rawAthleteYear",
    ({ rawAthleteYear, expected }) => {
      const result = getAthleteYear(rawAthleteYear);
      expect(result).toBe(expected);
    }
  );
});
