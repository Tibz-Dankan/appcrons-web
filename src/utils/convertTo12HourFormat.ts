export const convertTo12HourFormat = (time: string): string => {
  // Split the time string into hours, minutes, and seconds
  let [hours, minutes, seconds] = time.split(":");
  // Convert hours to a number
  let hoursNumber = parseInt(hours);
  // Determine the period (AM/PM)
  const period = hoursNumber >= 12 ? "PM" : "AM";

  // Adjust the hours for 12-hour format
  if (hoursNumber === 0) {
    hoursNumber = 12; // Midnight
  } else if (hoursNumber > 12) {
    hoursNumber -= 12; // Convert to 12-hour format
  }

  // Ensure the hours are in two digits
  const hours12 = hoursNumber.toString().padStart(2, "0");

  return `${hours12}:${minutes}${period}`;
};
