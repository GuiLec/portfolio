export const getId = ({
  rawFullName,
  rawEventDate,
  eventLocation,
  rawScore,
}: {
  rawFullName: string;
  rawEventDate: string;
  eventLocation: string;
  rawScore: string;
}) =>
  `${rawEventDate}-${eventLocation}-${rawScore}-${rawFullName}`.slice(0, 50);
