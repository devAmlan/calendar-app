"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDateStore, useShiftStore } from "@/lib/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import AddTime from "../addtime/AddTime";
import { Button } from "@/components/ui/button";
import MultiSelect from "../multiselect/MultiSelect";

function EventPopover({ isOpen, onClose, date, options }) {
  const [selectedTime, setSelectedTime] = useState("00:00");
  const [assignedMembers, setAssignedMembers] = useState([]);
  // const [eventTime, setEventTime] = useState({
  //   startTime: "00:00",
  //   endTime: "00:00",
  // });

  const { userSelectedDate } = useDateStore();
  const { title, startTime, endTime, setShift } = useShiftStore();

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

  // useEffect(() => {
  //   setEventTime({
  //     startTime: date.format("HH:mm"),
  //     endTime: date.add(1, "hour").format("HH:mm"),
  //   });
  // }, []);

  const onChangeInput = (e) => {
    const { name, value } = e?.target;
    setShift({ [name]: value });
  };

  const onChangeTime = (time) => {
    const { name, value } = time;
    setShift({ [name]: value });
  };

  const onSave = () => {
    console.log({ title, startTime, endTime });
  };

  const toggleOptions = (option) => {
    const newSelectedValue = assignedMembers.some(
      (member) => member?._id === option?._id
    )
      ? assignedMembers.filter((value) => value?._id !== option?._id)
      : [...assignedMembers, option];
    setAssignedMembers(newSelectedValue);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a shift</DialogTitle>
        </DialogHeader>
        <div className="py-3 flex flex-col gap-3">
          <Input
            type="text"
            className="py-3"
            placeholder="Enter Shift Title"
            name="title"
            value={title}
            onChange={onChangeInput}
          />

          <div className="flex items-center space-x-3">
            <Clock className="size-5" />
            <div className="w-full flex items-center justify-between text-base">
              <p>{dayjs(date).format("dddd, MMMM D")}</p>
              <div className="flex gap-2 items-center">
                <AddTime
                  onTimeSelect={onChangeTime}
                  timeKey={"startTime"}
                  compareTime={endTime}
                  value={startTime}
                />
                <p>-</p>
                <AddTime
                  onTimeSelect={onChangeTime}
                  timeKey={"endTime"}
                  compareTime={startTime}
                  value={endTime}
                />
              </div>
            </div>
            <Input type="hidden" name="date" value={date} />
            <Input type="hidden" name="time" value={selectedTime} />
          </div>
          <MultiSelect
            options={options}
            selectedOptions={assignedMembers}
            toggleOptions={toggleOptions}
          />
        </div>
        <DialogFooter>
          <Button className="text-lg px-8" onClick={onSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EventPopover;
