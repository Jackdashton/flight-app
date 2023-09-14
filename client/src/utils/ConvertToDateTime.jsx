// Utility function to convert from string in flightArray to date data type.
function convertToDateTime(dateString, timeString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const [hours, minutes, seconds] = timeString.split(":");
  const date = new Date(year, month - 1, day, hours, minutes, seconds);
  return date;
}

export default convertToDateTime;
