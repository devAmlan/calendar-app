function getCalandarData() {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i); // 7 days from today
    return {
      day: date.toLocaleString("default", { weekday: "short" }),
      date: date.getDate(),
    };
  });
}

function getEmployes() {
  return [
    {
      name: "Amlan",
      email: "amlan@gmail.com",
    },
    {
      name: "Amlan",
      email: "amlan@gmail.com",
    },
    {
      name: "Amlan",
      email: "amlan@gmail.com",
    },
    {
      name: "Amlan",
      email: "amlan@gmail.com",
    },
    {
      name: "Amlan",
      email: "amlan@gmail.com",
    },
    {
      name: "Amlan",
      email: "amlan@gmail.com",
    },
    {
      name: "Amlan",
      email: "amlan@gmail.com",
    },
    {
      name: "Amlan",
      email: "amlan@gmail.com",
    },
    {
      name: "Amlan",
      email: "amlan@gmail.com",
    },

    {
      name: "Amlan",
      email: "amlan@gmail.com",
    },
    {
      name: "Amlan",
      email: "amlan@gmail.com",
    },
    {
      name: "Amlan",
      email: "amlan@gmail.com",
    },
    {
      name: "Amlan",
      email: "amlan@gmail.com",
    },
  ];
}

export { getCalandarData, getEmployes };
