let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function getWeekday(date) {
  let d = date !== undefined ? date : new Date();
  return weekdays[d.getDay()];
}