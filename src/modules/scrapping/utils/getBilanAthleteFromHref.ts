export const getBilanAthleteFromHref = (athletehref?: string | null) => {
  if (!athletehref) {
    return "";
  }
  const match = athletehref.match(
    /bddThrowAthlete\('([^']*)', ([0-9]*), ([0-9]*)\)/
  );
  if (!match) {
    return "";
  }
  const seq = parseInt(match[2], 10);
  return strToHex(seq);
};

function strToHex(id: number) {
  var hexreturn = "";
  for (let i = 1; i <= id.toString().length; i++) {
    hexreturn = hexreturn + (99 - id.toString().charCodeAt(i - 1));
    hexreturn = hexreturn + id.toString().charCodeAt(i - 1);
  }
  return hexreturn;
}
