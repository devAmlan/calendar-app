export function useShiftTable() {
  function getCurrentWeek() {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i); // 7 days from today
      return {
        day: date.toLocaleString("default", { weekday: "short" }),
        date: date,
      };
    });
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const Fn = {
    getCurrentWeek,
    formatDate,
  };

  return {
    Fn,
  };
}
