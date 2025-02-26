type Eventtype = "5km" | "10km" | "halfMarathon" | "marathon";
type Gender = "M" | "F";

interface Constants {
  A: number;
  B: number;
}

const constants: { [key: string]: { [key: string]: Constants } } = {
  "5km": {
    M: { A: 0.00277, B: 1440 },
    F: { A: 0.0008076, B: 2100 },
  },
  "10km": {
    M: { A: 0.0005236, B: 3150 },
    F: { A: 0.0001711, B: 4500 },
  },
  halfMarathon: {
    M: { A: 0.0000946, B: 7140 },
    F: { A: 0.00002595, B: 10800 },
  },
  marathon: {
    M: { A: 0.0000201, B: 15300 },
    F: { A: 0.0000054, B: 23400 },
  },
};

const getConstants = (event: Eventtype, gender: Gender): Constants => {
  return constants[event][gender];
};

const getEvent = (event: string): Eventtype => {
  switch (event) {
    case "5 Km Route":
      return "5km";
    case "10 Km Route":
      return "10km";
    case "1/2 Marathon":
      return "halfMarathon";
    case "Marathon":
      return "marathon";
    default:
      throw new Error("Invalid event type");
  }
};

export const calculateIAAFScore = ({
  performance,
  eventType,
  gender,
}: {
  performance: number;
  eventType: string;
  gender: Gender;
}): number => {
  const event = getEvent(eventType);
  const { A, B } = getConstants(event, gender);
  if (performance > B) {
    return 0;
  }
  const score = A * Math.pow(B - performance, 2);
  return Math.round(score);
};
