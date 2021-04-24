export const convertDurationTimeToString = (duration: number) => {
  const hours = Math.floor(duration / ( 60 * 60));
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const time = [hours, minutes, seconds];

  const serializeTime = time.map(unit => String(unit).padStart(2, '0'));
  const timeString = serializeTime.join(':');

  return timeString;
}