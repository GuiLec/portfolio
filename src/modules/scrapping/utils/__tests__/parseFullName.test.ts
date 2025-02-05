import { parseFullName } from "@/modules/scrapping/utils/parseFullName";

describe("parseFullName", () => {
  it.each`
    rawFullName                   | expectedNationality | expectedFullName
    ${"BOUQANTAR Soufiyan (MAR)"} | ${"MAR"}            | ${"BOUQANTAR Soufiyan"}
    ${"KIPROTICH Abraham (UGA)"}  | ${"UGA"}            | ${"KIPROTICH Abraham"}
    ${"KIPROTICH Abraham (KEN)"}  | ${"KEN"}            | ${"KIPROTICH Abraham"}
    ${"KIPROTICH Abraham (ken)"}  | ${"KEN"}            | ${"KIPROTICH Abraham"}
    ${"KIPROTICH Abraham"}        | ${""}               | ${"KIPROTICH Abraham"}
    ${"KIPROTICH Abraham ()"}     | ${""}               | ${"KIPROTICH Abraham"}
    ${"SIMON (VIRGINAUD) Nelly"}  | ${""}               | ${"SIMON (VIRGINAUD) Nelly"}
    ${"(KEN)"}                    | ${"KEN"}            | ${""}
    ${null}                       | ${""}               | ${""}
  `(
    "should return $expectedNationality and $expectedFullName when rawFullName is $rawFullName",
    ({ rawFullName, expectedNationality, expectedFullName }) => {
      const result = parseFullName(rawFullName);
      expect(result).toStrictEqual({
        fullName: expectedFullName,
        nationality: expectedNationality,
      });
    }
  );
});
