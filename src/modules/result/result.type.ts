export interface Result {
  id: string;
  fullName: string;
  score: number;
  eventType: string;
  eventDate: Date;
  eventLocation: string;
}

export interface GetResultsResponse {
  results: RawResult[];
  count: number;
  length: number;
}

export interface RawResult {
  id: string;
  fullname: string;
  score: string;
  eventtype: string;
  eventdate: string;
  eventlocation: string;
}
