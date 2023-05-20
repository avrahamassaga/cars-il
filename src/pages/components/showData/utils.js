export const checkDate = (str) => {
  if(str){
    const [yearStr, monthStr] = str.split("-");
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);

    const currentDate = new Date();
    const targetDate = new Date(year, month - 1); // month is zero-indexed in Date constructor

    targetDate.setFullYear(targetDate.getFullYear() + 3);

    if (currentDate >= targetDate) {
      return false;
    } else {
      const year = targetDate.getFullYear();
      const month = targetDate.getMonth() + 1;
      return `${year}/${month.toString().padStart(2, "0")}`;
    }
  }
  return "אין מידע"
};

export const calcAge = (year) => {
  const currentDate = new Date();
  const born = parseInt(year);
  return currentDate.getFullYear() - born;
};

export const memuzaKilometerMumlaz = (type, year) => {
  const range = type === "פרטי" ? 15000 : 24000;
  const total = range * year
  return total.toLocaleString()
};
