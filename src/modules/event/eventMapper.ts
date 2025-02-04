import { AthleEvent, EventType } from "@/modules/event/interface";

interface AthleEventData {
  label: string;
  eventType: EventType;
}

export const eventMapper: Record<AthleEvent, AthleEventData> = {
  [AthleEvent["5km"]]: {
    label: "5 Km route",
    eventType: "5 Km route",
  },
  [AthleEvent["10km"]]: {
    label: "10 Km route",
    eventType: "10 Km route",
  },
  [AthleEvent["half"]]: {
    label: "Semi marathon",
    eventType: "1/2 Marathon",
  },
  [AthleEvent["marathon"]]: {
    label: "Marathon",
    eventType: "Marathon",
  },
};
