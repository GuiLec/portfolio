export const parseFullName = (
  rawFullName?: string | null
): {
  fullName: string;
  nationality: string;
} => {
  if (!rawFullName) {
    return {
      fullName: "",
      nationality: "",
    };
  }
  const match = rawFullName.match(/\(([^)]+)\)/);
  if (!match) {
    return {
      fullName: "",
      nationality: "",
    };
  }
  return {
    fullName: rawFullName.replace(match[0], "").trim(),
    nationality: match[1],
  };
};
