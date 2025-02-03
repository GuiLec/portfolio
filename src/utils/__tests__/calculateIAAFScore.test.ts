import { calculateIAAFScore } from "@/utils/calculateIAAFScore";

describe("calculateIAAFScore", () => {
  it.each`
    performance                   | eventType         | gender      | expected
    ${15 * 60 + 30}               | ${"5 Km Route"}   | ${"male"}   | ${720}
    ${13 * 60 + 8}                | ${"5 Km Route"}   | ${"male"}   | ${1178}
    ${26 * 60 + 37}               | ${"10 Km Route"}  | ${"male"}   | ${1263}
    ${45 * 60 + 17}               | ${"10 Km Route"}  | ${"male"}   | ${98}
    ${60 * 60 + 25 * 60 + 34}     | ${"1/2 Marathon"} | ${"male"}   | ${381}
    ${60 * 60 + 18 * 60 + 50}     | ${"1/2 Marathon"} | ${"male"}   | ${549}
    ${2 * 60 * 60 + 34 * 60 + 17} | ${"Marathon"}     | ${"male"}   | ${734}
    ${2 * 60 * 60 + 23 * 60 + 28} | ${"Marathon"}     | ${"male"}   | ${900}
    ${15 * 60 + 30}               | ${"5 Km Route"}   | ${"female"} | ${1106}
    ${17 * 60 + 30}               | ${"5 Km Route"}   | ${"female"} | ${890}
    ${39 * 60 + 10}               | ${"10 Km Route"}  | ${"female"} | ${791}
    ${36 * 60 + 59}               | ${"10 Km Route"}  | ${"female"} | ${890}
    ${2 * 60 * 60 + 3 * 60 + 18}  | ${"1/2 Marathon"} | ${"female"} | ${300}
    ${60 * 60 + 6 * 60 + 10}      | ${"1/2 Marathon"} | ${"female"} | ${1211}
    ${2 * 60 * 60 + 48 * 60 + 43} | ${"Marathon"}     | ${"female"} | ${952}
    ${2 * 60 * 60 + 20 * 60 + 17} | ${"Marathon"}     | ${"female"} | ${1212}
  `(
    "should return $expected when performance is $performance, eventType is $eventType, gender is $gender",
    ({ performance, eventType, gender, expected }) => {
      const result = calculateIAAFScore({ performance, gender, eventType });

      expect(result).toBe(expected);
    }
  );
});
