let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function getWeekday(date) {
  let d = date !== undefined ? date : new Date();
  return weekdays[d.getDay()];
}

export function getPrettyDate(date) {
  let dateObj = date !== undefined ? date : new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  let month = monthNames[dateObj.getMonth()];
  let day = String(dateObj.getDate()).padStart(2, '0');
  let year = dateObj.getFullYear();
  let output = `${day}/${month.slice(0, 3)}/${year}` ;

  return  output;
}