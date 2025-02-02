import moment from "moment";

export const getEventDate = (rawEventDate?: string | null): Date => {
  if (!rawEventDate) {
    return new Date(0);
  }
  const date = moment.utc(rawEventDate, "DD/MM/YY").toDate();
  return date;
};
