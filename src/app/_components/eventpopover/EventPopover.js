import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDateStore } from "@/lib/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import AddTime from "../addtime/AddTime";
import { Button } from "@/components/ui/button";

function EventPopover({ isOpen, onClose, date }) {
  const [selectedTime, setSelectedTime] = useState("00:00");

  const [eventTime, setEventTime] = useState({
    startTime: "00:00",
    endTime: "00:00",
  });

  const { userSelectedDate } = useDateStore();

  const convertISOFormat = (date, time) => {
    return `${date.format("YYYY-MM-DD")}T${time}:00`;
  };

  const compareTime = () => {};

  const onSelectTime = (key, value) => {
    setEventTime((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    setEventTime({
      startTime: date.format("HH:mm"),
      endTime: date.add(1, "hour").format("HH:mm"),
    });
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Time Range</DialogTitle>
        </DialogHeader>
        <div className="py-3 flex flex-col gap-3">
          <Input type="text" placeholder="Enter Shift Title" />
          <div className="flex items-center space-x-3">
            <Clock className="size-5" />
            <div className="flex items-center space-x-3 text-base">
              <p>{dayjs(date).format("dddd, MMMM D")}</p>
              <AddTime onTimeSelect={onSelectTime} timeKey={"startTime"} />
              <AddTime onTimeSelect={onSelectTime} timeKey={"endTime"} />
            </div>
            <Input type="hidden" name="date" value={date} />
            <Input type="hidden" name="time" value={selectedTime} />
          </div>
        </div>
        <DialogFooter>
          <Button className="text-lg px-8">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EventPopover;
