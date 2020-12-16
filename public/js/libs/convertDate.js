
export const convertDate = (date) => {
  const newDate = new Date(date);
  const today = new Date();
  const diff = Math.floor((today.getTime() - newDate.getTime())/(1000*60*60*24));
  if (!diff) {
    return `${newDate.getHours()}:${newDate.getMinutes()}`;
  } else if (diff < 7){
    return `${newDate.getDay()}`;
  } else {
    return `${newDate.getDate()}.${newDate.getMonth()}.${newDate.getFullYear()}`
  }
}