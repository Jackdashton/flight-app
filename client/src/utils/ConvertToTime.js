function ConvertToTime(timeString) {
  const [hours, minutes, seconds] = timeString.split(":");
  const date = new Date();
  date.setHours(hours, minutes, seconds, 0); //Date to 0 to get time only
  return date;
}

export default ConvertToTime;
