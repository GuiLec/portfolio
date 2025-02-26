const parseUnit = (unit: string): number => {
  if (unit === "") {
    return 0;
  }
  return parseInt(unit, 10);
};

export const parseRawScore = (rawScore?: string | null): number => {
  if (!rawScore) {
    return 0;
  }
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let hundredths = 0;

  rawScore = rawScore.replace(/\s*\(.*\)\s*$/, "");

  //====== SPECIAL CASES START ======//

  // sometime data is corrupted and is 3504 instead of 35'04''
  if (
    ["h", "'", "''"].every((unit) => !rawScore?.includes(unit)) &&
    rawScore.length === 4
  ) {
    minutes = parseUnit(rawScore.slice(0, 2));
    seconds = parseUnit(rawScore.slice(2, 4));
    return minutes * 100 * 60 + seconds * 100;
  }

  // sometimes the '' is missing, we should add them: for example: 	3h27'45 => 3h27'45'' or 27'45 => 27'45''
  if (rawScore.match(/h\d{1,2}'\d{1,2}$/)) {
    rawScore = rawScore.replace(/h(\d{1,2}'\d{1,2})$/, "h$1''");
  } else if (rawScore.match(/\d{1,2}'\d{1,2}$/)) {
    rawScore = rawScore.replace(/(\d{1,2}'\d{1,2})$/, "$1''");
  }

  // sometimes the ':' is used instead of h and ' for hours and minutes
  if (rawScore.match(/\d{1,2}:\d{1,2}:\d{1,2}/)) {
    rawScore = rawScore.replace(/(\d{1,2}):(\d{1,2}):(\d{1,2})/, "$1h$2'$3''");
  }

  // sometimes the ':' is used instead of ' for minutes
  if (rawScore.match(/\d{1,2}:\d{1,2}/)) {
    rawScore = rawScore.replace(/(\d{1,2}):(\d{1,2})/, "$1'$2''");
  }

  //====== SPECIAL CASES END ======//

  const splitHundredths = rawScore.split("''");
  if (splitHundredths.length === 2) {
    hundredths = parseUnit(splitHundredths[1]);
    rawScore = splitHundredths[0];
  } else {
    hundredths = parseUnit(splitHundredths[0]);
    return hundredths;
  }

  const splitSeconds = rawScore.split("'");
  if (splitSeconds.length === 2) {
    seconds = parseUnit(splitSeconds[1]);
    rawScore = splitSeconds[0];
  } else {
    seconds = parseUnit(splitSeconds[0]);
    return seconds * 100 + hundredths;
  }

  const splitMinutes = rawScore.split("h");
  if (splitMinutes.length === 2) {
    minutes = parseUnit(splitMinutes[1]);
    hours = parseUnit(splitMinutes[0]);
  } else {
    minutes = parseUnit(splitMinutes[0]);
    return minutes * 100 * 60 + seconds * 100 + hundredths;
  }

  return (
    hours * 100 * 60 * 60 + minutes * 100 * 60 + seconds * 100 + hundredths
  );
};
