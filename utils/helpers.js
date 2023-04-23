module.exports = {
  format_date: (date) => {
    // Format date as YYYY/MM/DD
    return date.toISOString().substring(0, 10);
  },
};
