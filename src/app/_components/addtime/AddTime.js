import React, { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

function AddTime({ onTimeSelect }) {
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
        intervals.push(
          `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`
        );
      }
    }
    return intervals;
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    onTimeSelect(time);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        className="w-24 justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedTime}
        <ChevronDown className="size-4 opacity-50" />
      </Button>
      {isOpen && (
        <div className="absolute z-50 mt-2 w-24 rounded-md border bg-popover text-popover-foreground shadow-md">
          <ScrollArea className="h-60">
            <div className="p-1">
              {generateTimeIntervals().map((time) => (
                <Button
                  key={time}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

export default AddTime;
