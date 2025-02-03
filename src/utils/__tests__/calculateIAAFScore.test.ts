import { calculateIAAFScore } from "@/utils/calculateIAAFScore";

describe("calculateIAAFScore", () => {
  it.each`
    performance                   | event             | gender      | expected
    ${15 * 60 + 30}               | ${"5km"}          | ${"male"}   | ${720}
    ${13 * 60 + 8}                | ${"5km"}          | ${"male"}   | ${1178}
    ${26 * 60 + 37}               | ${"10km"}         | ${"male"}   | ${1263}
    ${45 * 60 + 17}               | ${"10km"}         | ${"male"}   | ${98}
    ${60 * 60 + 25 * 60 + 34}     | ${"halfMarathon"} | ${"male"}   | ${381}
    ${60 * 60 + 18 * 60 + 50}     | ${"halfMarathon"} | ${"male"}   | ${549}
    ${2 * 60 * 60 + 34 * 60 + 17} | ${"marathon"}     | ${"male"}   | ${734}
    ${2 * 60 * 60 + 23 * 60 + 28} | ${"marathon"}     | ${"male"}   | ${900}
    ${15 * 60 + 30}               | ${"5km"}          | ${"female"} | ${1106}
    ${17 * 60 + 30}               | ${"5km"}          | ${"female"} | ${890}
    ${39 * 60 + 10}               | ${"10km"}         | ${"female"} | ${791}
    ${36 * 60 + 59}               | ${"10km"}         | ${"female"} | ${890}
    ${2 * 60 * 60 + 3 * 60 + 18}  | ${"halfMarathon"} | ${"female"} | ${300}
    ${60 * 60 + 6 * 60 + 10}      | ${"halfMarathon"} | ${"female"} | ${1211}
    ${2 * 60 * 60 + 48 * 60 + 43} | ${"marathon"}     | ${"female"} | ${952}
    ${2 * 60 * 60 + 20 * 60 + 17} | ${"marathon"}     | ${"female"} | ${1212}
  `(
    "should return $expected when performance is $performance, event is $event, gender is $gender",
    ({ performance, event, gender, expected }) => {
      const result = calculateIAAFScore({ performance, gender, event });
      const approximatedResult = Number(result).toFixed(0);

      expect(approximatedResult).toBe(expected.toString());
    }
  );
});

// ${15 * 60 + 30}               | ${"5km"}          | ${"female"} | ${1106}
// ${39 * 60 + 10}               | ${"10km"}         | ${"female"} | ${791}
// ${2 * 60 * 60 + 3 * 60 + 18}     | ${"halfMarathon"} | ${"female"} | ${300}
// ${2 * 60*60+48*60 + 43}                | ${"marathon"}     | ${"female"} | ${950}
