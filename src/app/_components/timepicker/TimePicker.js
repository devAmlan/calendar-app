"use client";
import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import dayjs from "dayjs";
import _ from "lodash";

function TimePicker(props) {
  const { onChange, label, timeKey, date } = props;

  const pastDate = dayjs().isAfter(date, "day");
  const isToday = dayjs().isSame(date, "day");

  return (
    <div className="w-full flex flex-col gap-2">
      <p className="font-semibold text-base">{label}</p>
      <Select
        onValueChange={(e) => {
          const [hours, minutes] = e.split(":");
          onChange({
            name: timeKey,
            value: dayjs(date).hour(hours).minute(minutes).second(0),
          });
        }}
      >
        <SelectTrigger className="font-normal focus:ring-0 w-full">
          <SelectValue placeholder="--:--" />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-60">
            {Array.from({ length: 96 }).map((_, i) => {
              const hour = Math.floor(i / 4);

              const minute = ((i % 4) * 15).toString().padStart(2, "0");

              const hour12 = hour % 12 === 0 ? 12 : hour % 12;
              const period = hour < 12 ? "AM" : "PM";
              const isDisabled =
                pastDate ||
                (isToday &&
                  hour * 60 + (i % 4) * 15 <
                    dayjs().hour() * 60 + dayjs().minute());

              return (
                <SelectItem
                  key={i}
                  value={`${hour}:${minute}`}
                  className={`${
                    isDisabled &&
                    `pointer-events-none cursor-not-allowed text-gray-300`
                  }`}
                >
                  {hour12}:{minute} {period}
                </SelectItem>
              );
            })}
          </ScrollArea>
        </SelectContent>
      </Select>

      {/* <p>{startTime?.format("YYYY-MM-DD HH:mm")}</p> */}
    </div>
  );
}

export default TimePicker;
