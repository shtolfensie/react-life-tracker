export const getCurrentDate = () => {
  let date = new Date();
  date.setHours(0,0,0,0);
  return date.valueOf();
}

export const getCurrentDateAndTime = () => {
  let date = new Date();
  return date.valueOf();
}