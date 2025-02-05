export const parseFullName = (
  rawFullName?: string | null
): {
  fullName: string;
  nationality: string;
} => {
  if (rawFullName == null) {
    return { fullName: "", nationality: "" };
  }

  const regex = /(.*)\s*\((.{0,3}?)\)$/;
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
