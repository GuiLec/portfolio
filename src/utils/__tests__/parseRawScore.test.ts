import { parseRawScore } from "@/utils/parseRawScore";

describe("parseRawScore", () => {
  it.each`
    rawScore                | expected
    ${"2h03'47''"}          | ${2 * 100 * 60 * 60 + 3 * 100 * 60 + 47 * 100}
    ${"2h3'47''"}           | ${2 * 100 * 60 * 60 + 3 * 100 * 60 + 47 * 100}
    ${"02h03'47''"}         | ${2 * 100 * 60 * 60 + 3 * 100 * 60 + 47 * 100}
    ${"03'47''"}            | ${3 * 100 * 60 + 47 * 100}
    ${"3'47''"}             | ${3 * 100 * 60 + 47 * 100}
    ${"11''04 (+2.0)"}      | ${11 * 100 + 4}
    ${"2h03'47''05 (-1.4)"} | ${2 * 100 * 60 * 60 + 3 * 100 * 60 + 47 * 100 + 5}
    ${"2h04'47'' (+0.3)"}   | ${2 * 100 * 60 * 60 + 4 * 100 * 60 + 47 * 100}
    ${"3504"}               | ${35 * 100 * 60 + 4 * 100}
    ${null}                 | ${0}
    ${undefined}            | ${0}
  `("should return 0 when rawScore is $rawScore", ({ rawScore, expected }) => {
    expect(parseRawScore(rawScore)).toBe(expected);
  });
});
