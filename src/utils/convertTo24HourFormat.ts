export const convertTo24HourFormat = (time: string): string => {
  // Extract the period (AM/PM) from the time string
  const period = time.slice(-2);
  // Remove the period from the time string and split it into hours and minutes
  let [hours, minutes] = time.slice(0, -2).split(":");
  // Convert hours to a number
  let hoursNumber = parseInt(hours);

  // If the period is PM and the hours are not 12, add 12 to the hours
  if (period === "PM" && hoursNumber !== 12) {
    hoursNumber += 12;
  }
  // If the period is AM and the hours are 12, set the hours to 0 (midnight)
  if (period === "AM" && hoursNumber === 12) {
    hoursNumber = 0;
  }

  // Ensure the hours and minutes are two digits
  const hours24 = hoursNumber.toString().padStart(2, "0");
  const minutes24 = minutes.padStart(2, "0");

  return `${hours24}:${minutes24}:00`;
};
