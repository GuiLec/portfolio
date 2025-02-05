import { Athlete } from "@/modules/athlete/interface";
import { RawScrapedAthlete } from "@/modules/scrapping/athlete/interface";

export const adapatRawScrapedAthlete = (
  rawScrapedAthlete: RawScrapedAthlete
): Athlete => {
  return {
    fullName: rawScrapedAthlete.fullName ?? "",
  };
};
