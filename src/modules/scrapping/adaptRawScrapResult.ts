import { RawScrapResult } from "@/modules/scrapping/interface";
import { getAthleteYear } from "@/modules/scrapping/utils/getAthleteYear";
import { getEventDate } from "@/modules/scrapping/utils/getEventDate";
import { getEventType } from "@/modules/scrapping/utils/getEventType";
import { getId } from "@/modules/scrapping/utils/getId";
import { parseRawScore } from "@/modules/scrapping/utils/parseRawScore";
import { calculateIAAFScore } from "@/utils/calculateIAAFScore";
import { getGenderFromAgeCategory } from "@/utils/getGenderFromAgeCategory";

export const adaptRawScrapResult = ({
  rawScrapResult,
  rawSearchDescription,
}: {
  rawScrapResult: RawScrapResult;
  rawSearchDescription?: string;
}) => {
  const fullName = rawScrapResult.fullName ?? "";
  const club = rawScrapResult.club ?? "";
  const clubRegion = rawScrapResult.clubRegion ?? "";
  const clubDepartement = rawScrapResult.clubDepartement ?? "";
  const athleteYear = getAthleteYear(rawScrapResult.athleteYear);
  const resultAgeCategory = rawScrapResult.resultAgeCategory ?? "";
  const eventLocation = rawScrapResult.eventLocation ?? "";
  const eventType = getEventType(rawSearchDescription);
  const score = parseRawScore(rawScrapResult.rawScore);
  const id = getId({
    fullName,
    rawEventDate: rawScrapResult.eventDate ?? "",
    eventLocation,
    rawScore: rawScrapResult.rawScore ?? "",
  });
  const eventDate = getEventDate(rawScrapResult.eventDate);
  const iaafScore = calculateIAAFScore({
    performance: score / 100,
    eventType,
    gender: getGenderFromAgeCategory(resultAgeCategory),
  });

  return {
    id,
    fullName,
    club,
    clubRegion,
    clubDepartement,
    athleteYear,
    resultAgeCategory,
    eventDate,
    eventLocation,
    score,
    eventType,
    iaafScore,
  };
};
