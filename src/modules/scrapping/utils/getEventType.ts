export const getEventType = (rawSearchDescription?: string | null) => {
  if (!rawSearchDescription) {
    return "";
  }

  const eventType = rawSearchDescription.split(" | ")[1];
  return eventType;
};
