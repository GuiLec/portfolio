import { AthleEvent } from "@/modules/event/interface";

interface AthleEventData {
  label: string;
}

export const eventMapper: Record<AthleEvent, AthleEventData> = {
  [AthleEvent["5km"]]: {
    label: "5 Km route",
  },
  [AthleEvent["10km"]]: {
    label: "10 Km route",
  },
  [AthleEvent["half"]]: {
    label: "Semi marathon",
  },
  [AthleEvent["marathon"]]: {
    label: "Marathon",
  },
};
