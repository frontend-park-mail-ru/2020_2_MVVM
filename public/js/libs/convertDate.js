
const days = ['вс', 'пн', 'вт', 'ср', "чт", "пт", "сб"];

export const convertDate = (date) => {
  const newDate = new Date(date);
  const today = new Date();
  const diff = Math.floor((today.getTime() - newDate.getTime())/(1000*60*60*24));
  if (!diff && newDate.getDay()===today.getDay()) {
    return `${newDate.getHours()}:${newDate.getMinutes()}`;
  } else if (!diff || diff < 7){
    return `${days[today.getDay()]} ${newDate.getHours()}:${newDate.getMinutes()}`;
  } else {
    return `${newDate.getDate()}.${newDate.getMonth()}.${newDate.getFullYear()}`
  }
}