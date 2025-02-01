import { RawResult } from "@/app/api/athle/result/get-results/interface";
import { Result } from "@/modules/result/result.type";

export const adaptResult = (rawResult: RawResult): Result => ({
  id: rawResult.id,
  fullName: rawResult.fullname,
  score: Number(rawResult.score),
  eventType: rawResult.eventtype,
  eventDate: new Date(rawResult.eventdate),
  eventLocation: rawResult.eventlocation,
});
