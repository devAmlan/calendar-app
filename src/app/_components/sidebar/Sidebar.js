import React from "react";
import _ from "lodash";
import { Calendar, UserRound } from "lucide-react";
const NAV_ITEMS = [
  {
    _id: "349039430493",
    label: "Calendar",
    icon: Calendar,
  },
  {
    _id: "349039430494",
    label: "Members",
    icon: UserRound,
  },
];
function Sidebar() {
  return (
    <ul className="w-full h-full flex justify-start items-start p-2 flex-col">
      {_.map(NAV_ITEMS, (item) => (
        <li
          className="w-full py-2 border-b border-gray-200 flex justify-start items-center gap-3 cursor-pointer"
          key={item?._id}
        >
          <item.icon className="size-4" />
          <p className="text-base font-semibold">{item?.label}</p>
        </li>
      ))}
    </ul>
  );
}

export default Sidebar;
