import { calculateIAAFScore } from "@/utils/calculateIAAFScore";

describe("calculateIAAFScore", () => {
  it.each`
    performance                   | eventType         | gender | expected
    ${15 * 60 + 30}               | ${"5 Km Route"}   | ${"M"} | ${720}
    ${13 * 60 + 8}                | ${"5 Km Route"}   | ${"M"} | ${1178}
    ${26 * 60 + 37}               | ${"10 Km Route"}  | ${"M"} | ${1263}
    ${45 * 60 + 17}               | ${"10 Km Route"}  | ${"M"} | ${98}
    ${60 * 60 + 25 * 60 + 34}     | ${"1/2 Marathon"} | ${"M"} | ${381}
    ${60 * 60 + 18 * 60 + 50}     | ${"1/2 Marathon"} | ${"M"} | ${549}
    ${2 * 60 * 60 + 34 * 60 + 17} | ${"Marathon"}     | ${"M"} | ${734}
    ${2 * 60 * 60 + 23 * 60 + 28} | ${"Marathon"}     | ${"M"} | ${900}
    ${15 * 60 + 30}               | ${"5 Km Route"}   | ${"F"} | ${1106}
    ${17 * 60 + 30}               | ${"5 Km Route"}   | ${"F"} | ${890}
    ${39 * 60 + 10}               | ${"10 Km Route"}  | ${"F"} | ${791}
    ${36 * 60 + 59}               | ${"10 Km Route"}  | ${"F"} | ${890}
    ${2 * 60 * 60 + 3 * 60 + 18}  | ${"1/2 Marathon"} | ${"F"} | ${300}
    ${60 * 60 + 6 * 60 + 10}      | ${"1/2 Marathon"} | ${"F"} | ${1211}
    ${2 * 60 * 60 + 48 * 60 + 43} | ${"Marathon"}     | ${"F"} | ${952}
    ${2 * 60 * 60 + 20 * 60 + 17} | ${"Marathon"}     | ${"F"} | ${1212}
    ${37 * 60 + 30}               | ${"5 Km Route"}   | ${"M"} | ${0}
  `(
    "should return $expected when performance is $performance, eventType is $eventType, gender is $gender",
    ({ performance, eventType, gender, expected }) => {
      const result = calculateIAAFScore({ performance, gender, eventType });

      expect(result).toBe(expected);
    }
  );
});
