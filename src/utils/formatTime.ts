import moment from "moment";

export const formatTime = (hundredsOfSeconds: number) => {
  const totalMilliseconds = hundredsOfSeconds * 10;
  const duration = moment.duration(totalMilliseconds);

  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  const hundreds = Math.floor(duration.milliseconds() / 10);

  let formattedTime = `${seconds.toString().padStart(2, "0")}''${hundreds
    .toString()
    .padStart(2, "0")}`;

  if (hundreds === 0) {
    formattedTime = `${seconds.toString().padStart(2, "0")}''`;
  }

  if (minutes > 0 || hours > 0) {
    formattedTime = `${minutes.toString().padStart(2, "0")}'${formattedTime}`;
  }

  if (hours > 0) {
    formattedTime = `${hours}h${formattedTime}`;
  }

  return formattedTime;
};
