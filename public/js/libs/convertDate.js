
const days = ['вс', 'пн', 'вт', 'ср', "чт", "пт", "сб"];

export const convertDate = (date) => {
  const newDate = new Date(date);
  const today = new Date();
  const diff = Math.floor((today.getTime() - newDate.getTime())/(1000*60*60*24));
  const hh = newDate.getHours() <= 9 ? '0' + newDate.getHours() : newDate.getHours();
  const mm = newDate.getMinutes() <= 9 ? '0' + newDate.getMinutes() : newDate.getMinutes();
  if (!diff && newDate.getDay()===today.getDay()) {
    return `${hh}:${mm}`;
  } else if (!diff || diff < 7){
    return `${days[newDate.getDay()]} ${hh}:${mm}`;
  } else {
    return `${newDate.getDate()}.${newDate.getMonth()}.${newDate.getFullYear()}`
  }
}