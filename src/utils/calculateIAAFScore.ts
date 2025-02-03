type Eventtype = "5km" | "10km" | "halfMarathon" | "marathon";
type Gender = "male" | "female";

interface Constants {
  A: number;
  B: number;
}

const getConstants = (event: Eventtype, gender: Gender): Constants => {
  const constants: { [key: string]: { [key: string]: Constants } } = {
    "5km": {
      male: { A: 0.00277, B: 1440 },
      female: { A: 0.0008076, B: 2100 },
    },
    "10km": {
      male: { A: 0.0005236, B: 3150 },
      female: { A: 0.0001711, B: 4500 },
    },
    halfMarathon: {
      male: { A: 0.0000946, B: 7140 },
      female: { A: 0.00002595, B: 10800 },
    },
    marathon: {
      male: { A: 0.0000201, B: 15300 },
      female: { A: 0.0000054, B: 23400 },
    },
  };

  return constants[event][gender];
};

export const calculateIAAFScore = ({
  performance,
  event,
  gender,
}: {
  performance: number;
  event: Eventtype;
  gender: Gender;
}): number => {
  const { A, B } = getConstants(event, gender);
  const score = A * Math.pow(B - performance, 2);
  return score;
};
