import React, { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import dayjs from "dayjs";

function AddTime({ onTimeSelect, timeKey, value, compareTime }) {
  const [selectedTime, setSelectedTime] = useState("00:00");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const generateTimeIntervals = () => {
    const intervals = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const isPM = hour >= 12;
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        const period = isPM ? "PM" : "AM";

        intervals.push({
          hour,
          minute,
          timeString: `${formattedHour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")} ${period}`,
          time: dayjs().hour(hour).minute(minute).second(0),
        });
      }
    }
    return intervals;
  };

  const handleTimeSelect = (time) => {
    onTimeSelect({ name: timeKey, value: time });
    setIsOpen(false);
  };

  const now = new Date();

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        className="w-full flex justify-between gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value?.format("hh:mm A")}
        {isOpen ? (
          <ChevronUp className="size-4 opacity-50" />
        ) : (
          <ChevronDown className="size-4 opacity-50" />
        )}
      </Button>
      {isOpen && (
        <div className="absolute z-50 mt-2 w-28 rounded-md border bg-popover text-popover-foreground shadow-md">
          <ScrollArea className="h-60">
            <div className="p-1">
              {generateTimeIntervals().map((item, index) => {
                // const isDisabled =
                //   item?.hour < now.getHours() ||
                //   (item?.hour === now.getHours() &&
                //     item?.minute < now.getMinutes()) ||
                //   dayjs()
                //     .hour(item?.hour)
                //     .minute(item?.minute)
                //     .second(0)
                //     .isBefore(compareTime) ||
                //   dayjs()
                //     .hour(item?.hour)
                //     .minute(item?.minute)
                //     .second(0)
                //     .isSame(compareTime);

                return (
                  <Button
                    key={index}
                    variant="ghost"
                    className={"w-full justify-start"}
                    onClick={() => handleTimeSelect(item?.time)}
                    // disabled={isDisabled}
                  >
                    {item?.timeString}
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

export default AddTime;
