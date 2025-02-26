export interface Result {
  id: string;
  fullName: string;
  club: string;
  clubRegion: string;
  clubDepartement: string;
  athleteYear: number;
  resultAgeCategory: string;
  score: number;
  eventType: string;
  eventDate: Date;
  eventLocation: string;
  iaafScore: number;
  gender: "M" | "F";
  nationality: string;
  bilanAthlete: string;
}

export interface GetResultsResponse {
  results: RawResult[];
  count: number;
  length: number;
}

export interface RawResult {
  id: string;
  fullname: string | null;
  club: string | null;
  clubregion: string | null;
  clubdepartement: string | null;
  athleteyear: string | null;
  resultagecategory: string | null;
  score: string | null;
  eventtype: string | null;
  eventdate: string | null;
  eventlocation: string | null;
  iaafscore: string | null;
  gender: string | null;
  nationality: string | null;
  bilanathlete: string | null;
}
