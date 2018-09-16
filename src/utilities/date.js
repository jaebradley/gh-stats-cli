const getDaysAgo = (daysAgo) => {
  const today = new Date();
  const date = new Date();
  date.setDate(today.getDate() - daysAgo);
  return date;
};

const getWeekAgo = () => getDaysAgo(7);

const getYesterday = () => getDaysAgo(1);

export {
  getWeekAgo,
  getYesterday,
};
