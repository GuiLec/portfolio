export const parseFullName = (
  rawFullName?: string | null
): {
  fullName: string;
  nationality: string;
} => {
  if (rawFullName == null) {
    return { fullName: "", nationality: "" };
  }

  const regex = /(.*)\s*\((.*?)\)$/;
  const match = regex.exec(rawFullName);

  let fullName = "";
  let nationality = "";

  if (match) {
    fullName = (match[1] || "").trim();
    nationality = (match[2] || "").trim().toUpperCase();
  } else {
    fullName = rawFullName.trim();
  }

  return { fullName, nationality };
};

describe("parseFullName", () => {
  it.each`
    rawFullName                   | expectedNationality | expectedFullName
    ${"BOUQANTAR Soufiyan (MAR)"} | ${"MAR"}            | ${"BOUQANTAR Soufiyan"}
    ${"KIPROTICH Abraham (UGA)"}  | ${"UGA"}            | ${"KIPROTICH Abraham"}
    ${"KIPROTICH Abraham (KEN)"}  | ${"KEN"}            | ${"KIPROTICH Abraham"}
    ${"KIPROTICH Abraham (ken)"}  | ${"KEN"}            | ${"KIPROTICH Abraham"}
    ${"KIPROTICH Abraham"}        | ${""}               | ${"KIPROTICH Abraham"}
    ${"KIPROTICH Abraham ()"}     | ${""}               | ${"KIPROTICH Abraham"}
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
