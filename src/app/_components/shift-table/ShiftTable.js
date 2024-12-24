"use client";
import React, { useState } from "react";
import { useShiftTable } from "./useShiftTable";
import { useDateStore } from "@/lib/store";

import _ from "lodash";
import { CirclePlusIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EventPopover from "../eventpopover/EventPopover";
import dayjs from "dayjs";

export const MEMBERS = [
  {
    _id: "0340304ksllfnsdds0",
    name: "Amlan sahoo",
    email: "amlan@gmail.com",
  },
];

function ShiftTable() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const { Fn } = useShiftTable();
  const { getCurrentWeek, formatDate } = Fn;

  const currentWeek = getCurrentWeek();
  const items = [
    {
      size: 8,
    },
    {
      size: 3,
    },
    {
      size: 1,
    },
    {
      size: 4,
    },
  ];

  const { userSelectedDate } = useDateStore();

  const getTitle = (size, text) => {
    switch (size) {
      case 2:
        return <p className="font-semibold text-sm w-[4ch] truncate">{text}</p>;
      case 1:
        return <p className="font-semibold text-sm w-[2ch] truncate">{text}</p>;
      default:
        return <p className="font-semibold text-sm">{text}</p>;
    }
  };

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <div className="w-full flex flex-col gap-2">
      {_.map(currentWeek, (item, index) => (
        <div className="border rounded-md border-gray-200 p-2 flex" key={index}>
          <div className="px-2 border-r border-gray-200 w-16 text-center">
            <p>{item?.day}</p>
            <h3 className="text-xl font-bold">{item?.date.getDate()}</h3>
          </div>
          <div className="flex-1 flex flex-row gap-1">
            {_.map(items, (item, index) => (
              <div
                className="bg-[#8b5dff2c] text-[#8B5DFF] border-0 mx-1 rounded p-2 flex gap-2 cursor-pointer"
                key={index}
                style={{
                  width: `calc(${item.size}/24 * 100%)`,
                }}
              >
                {/* <div className="h-full w-2 bg-emerald-400 rounded-full"></div> */}
                <div className="flex flex-col gap-2">
                  {getTitle(item?.size, "#1st Shift")}
                  {/* <Avatar className="w-5 h-5 rounded-full">
                    <AvatarImage
                      src={"https://github.com/shadcn.png"}
                      alt="profile-pic"
                    />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar> */}
                </div>
              </div>
            ))}
            <div
              className="flex justify-center items-center pl-2"
              onClick={() => {
                setSelectedDate(item?.date);
                onOpen();
              }}
            >
              <CirclePlusIcon className="text-gray-300 cursor-pointer" />
            </div>
          </div>
        </div>
      ))}
      <EventPopover
        isOpen={open}
        onClose={onClose}
        date={dayjs(selectedDate)}
        options={MEMBERS}
      />
    </div>
  );
}

export default ShiftTable;
