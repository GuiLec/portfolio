import { RawResult, Result } from "@/modules/result/result.type";

export const adaptResult = (rawResult: RawResult): Result => {
  return {
    id: rawResult.id ?? "",
    fullName: rawResult.fullname ?? "",
    club: rawResult.club ?? "",
    clubRegion: rawResult.clubregion ?? "",
    clubDepartement: rawResult.clubdepartement ?? "",
    athleteYear: Number(rawResult.athleteyear),
    resultAgeCategory: rawResult.resultagecategory ?? "",
    score: Number(rawResult.score),
    eventType: rawResult.eventtype ?? "",
    eventDate: new Date(rawResult.eventdate ?? 0),
    eventLocation: rawResult.eventlocation ?? "",
    iaafScore: Number(rawResult.iaafscore),
  };
};
