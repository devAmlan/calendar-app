import React, { useState } from "react";
import dayjs from "dayjs";
import { Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import AddTime from "../addtime/AddTime";

function EventPopover({ isOpen, onClose, date }) {
  const [selectedTime, setSelectedTime] = useState("00:00");
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
              <AddTime onTimeSelect={setSelectedTime} />
            </div>
            <Input type="hidden" name="date" value={date} />
            <Input type="hidden" name="time" value={selectedTime} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EventPopover;
