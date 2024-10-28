export function formatTime(inputTime: any) {
  return new Date(inputTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatDate(inputDate: any) {
  return new Date(inputDate).toISOString().split("T")[0];
}

// Covnert time string to Date object
export const parseTimeString = (timeString: any) => {
  const [hours, minutes, seconds] = timeString.split(":");
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds || 0);
  return date;
};
