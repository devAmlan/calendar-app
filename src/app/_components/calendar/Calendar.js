"use client";
import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Trash2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const formatTimeLabel = (time24) => {
  const [hours, minutes] = time24.split(":");
  let hour = parseInt(hours);
  const modifier = hour < 12 ? "AM" : "PM";

  hour = hour % 12;
  hour = hour || 12;

  return `${hour}:${minutes} ${modifier}`;
};
const Employes = [
  {
    _id: "49504545",
    name: "Amlan",
    profilePic: "https://github.com/shadcn.png",
  },
  {
    _id: "49504546",
    name: "Ankit",
    profilePic: "https://github.com/shadcn.png",
  },
];

export function Calendar(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Generate time slots with 15-minute increments
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of [0, 15, 30, 45]) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        const label = formatTimeLabel(time);
        slots.push({ value: time, label });
      }
    }
    return slots;
  }, []);

  // Convert time to decimal for easier comparison
  const timeToDecimal = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  };

  // Get week dates starting from selected date
  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(selectedDate);
      date.setDate(date.getDate() + i);
      return date;
    });
  }, [selectedDate]);

  // Format date for display
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Check if a slot is selected
  const isSlotSelected = (date, time) => {
    const slotDate = date.toDateString();
    const slotDecimal = timeToDecimal(time);

    return selectedRanges.some((range) => {
      if (range.date === slotDate) {
        const rangeStart = timeToDecimal(range.startTime);
        const rangeEnd = timeToDecimal(range.endTime);
        return slotDecimal >= rangeStart && slotDecimal < rangeEnd;
      }
      return false;
    });
  };

  // Handle slot click
  const handleSlotClick = (date, time) => {
    setSelectedSlot({
      date: date,
      dateString: date.toDateString(),
      time: time,
    });

    // Find existing range if clicked slot is within a range
    const existingRange = selectedRanges.find(
      (range) =>
        range.date === date.toDateString() &&
        timeToDecimal(time) >= timeToDecimal(range.startTime) &&
        timeToDecimal(time) < timeToDecimal(range.endTime)
    );

    if (existingRange) {
      // If clicked on an existing range, pre-fill the modal with that range
      setStartTime(existingRange.startTime);
      setEndTime(existingRange.endTime);
    } else {
      // Otherwise, set default range
      setStartTime(time);
      const endTimeIndex =
        timeSlots.findIndex((slot) => slot.value === time) + 4;
      setEndTime(timeSlots[Math.min(endTimeIndex, timeSlots.length - 1)].value);
    }

    setIsModalOpen(true);
  };

  // Handle time selection in modal
  const handleTimeSelect = () => {
    // Remove any existing ranges for the same date
    const filteredRanges = selectedRanges.filter(
      (range) => range.date !== selectedSlot.dateString
    );

    // Add new range
    const newRange = {
      date: selectedSlot.dateString,
      startTime: startTime,
      endTime: endTime,
    };

    setSelectedRanges([...filteredRanges, newRange]);
    setIsModalOpen(false);
  };

  // Navigate weeks
  const navigateWeek = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction * 7);
    setSelectedDate(newDate);
  };

  const getSlotDetails = (date, time) => {
    const slotDate = date.toDateString();
    const slotDecimal = timeToDecimal(time);

    const matchedRange = selectedRanges.find((range) => {
      if (range.date === slotDate) {
        const rangeStart = timeToDecimal(range.startTime);
        const rangeEnd = timeToDecimal(range.endTime);
        return slotDecimal >= rangeStart && slotDecimal < rangeEnd;
      }
      return false;
    });

    return matchedRange;
  };

  return (
    <div className="w-full">
      {/* Navigation Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Calendar</h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigateWeek(-1)}
            className="p-2 rounded hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => navigateWeek(1)}
            className="p-2 rounded hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="border rounded-lg">
        {/* Days Header */}
        <div className="grid grid-cols-8 border-b">
          <div className="p-2 border-r"></div>
          {weekDates.map((date, index) => (
            <div
              key={index}
              className="p-2 text-center border-r last:border-r-0"
            >
              {formatDate(date)}
            </div>
          ))}
        </div>
        {/* Time Slots */}
        {timeSlots.map((slot, hourIndex) => (
          <div key={hourIndex} className="grid grid-cols-8">
            <div className="p-2 border-r border-b text-sm">{slot.label}</div>
            {weekDates.map((date, dateIndex) => {
              const slotRange = getSlotDetails(date, slot.value);

              return (
                <div
                  key={dateIndex}
                  onClick={() => handleSlotClick(date, slot.value)}
                  className={`p-2 relative cursor-pointer transition-colors
                    ${
                      slotRange
                        ? "bg-blue-500 text-white border-b-0"
                        : "hover:bg-gray-50 border-b"
                    } 
                    ${slotRange ? "border-b-0" : "border-r-2 last:border-r-0"}`}
                >
                  {slotRange && dateIndex === 0 && (
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white/80 px-2 py-1 rounded text-xs">
                      {formatTimeLabel(slotRange.startTime)} -
                      {formatTimeLabel(slotRange.endTime)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {/* Time Selection Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Time Range</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">
              Date: {selectedSlot && formatDate(selectedSlot.date)}
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Time
                </label>
                <select
                  value={startTime}
                  onChange={(e) => {
                    const newStart = e.target.value;
                    setStartTime(newStart);
                    // Adjust end time if it's before or equal to start time
                    const startIndex = timeSlots.findIndex(
                      (slot) => slot.value === newStart
                    );
                    const endIndex = Math.min(
                      startIndex + 4,
                      timeSlots.length - 1
                    );
                    setEndTime(timeSlots[endIndex].value);
                  }}
                  className="w-full border rounded p-2"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Time
                </label>
                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full border rounded p-2"
                >
                  {timeSlots
                    .filter(
                      (slot) =>
                        timeToDecimal(slot.value) > timeToDecimal(startTime)
                    )
                    .map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleTimeSelect}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={false}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-start items-start gap-5">
              <Trash2 className="cursor-pointer w-5 h-5" />
              <Pencil className="cursor-pointer w-5 h-5" />
            </DialogTitle>
          </DialogHeader>
          <div className="py-3 flex flex-col gap-4">
            <h3 className="text-xl text-primary font-bold">
              # 1st Shift-29th Dec
            </h3>
            <div className="flex justify-start items-center gap-5">
              <h5 className="text-lg text-black/40 font-semibold">
                Friday,29th Dec
              </h5>
              <h5 className="text-lg text-black/40 font-semibold">1 PM-7 PM</h5>
            </div>
            <div className="flex justify-start items-start gap-3 flex-wrap">
              {Employes.map((employee) => (
                <TooltipProvider key={employee?._id}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar>
                        <AvatarImage
                          src={employee?.profilePic}
                          alt="profile-pic"
                        />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black">
                      <p className="text-sm font-semibold">{employee?.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
