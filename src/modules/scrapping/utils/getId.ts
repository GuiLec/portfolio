export const getId = ({
  fullName,
  rawEventDate,
  eventLocation,
  rawScore,
}: {
  fullName: string;
  rawEventDate: string;
  eventLocation: string;
  rawScore: string;
}) => `${rawEventDate}-${eventLocation}-${rawScore}-${fullName}`.slice(0, 50);
