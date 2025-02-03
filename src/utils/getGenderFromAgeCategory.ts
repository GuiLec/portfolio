const maleAgeCategories = ["CAM", "ESM", "JUM", "MIM", "SEM", "VEM"];
const femaleAgeCategories = ["CAF", "ESF", "JUF", "MIF", "SEF", "VEF"];

export const getGenderFromAgeCategory = (ageCategory: string) => {
  if (maleAgeCategories.includes(ageCategory)) {
    return "male";
  } else if (femaleAgeCategories.includes(ageCategory)) {
    return "female";
  } else {
    throw new Error("Invalid age category");
  }
};
