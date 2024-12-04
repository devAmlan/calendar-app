import dayjs from "dayjs";

export const dayEvents = [
  {
    id: "ascx34",
    date: dayjs().hour(10),
    title: "Meeting with team",
    description: "We are meeting",
  },
  {
    id: "ascx35",
    date: dayjs().hour(14),
    title: "Project deadline",
    description: "We are meeting",
  },
];

export const weekEvents = [
  {
    id: "ascx34",
    date: dayjs().hour(10),
    title: "Meeting with team",
    description: "We are meeting",
  },
  {
    id: "ascx35",
    date: dayjs().add(3, "day").hour(14),
    title: "Project deadline",
    description: "We are meeting",
  },
];
