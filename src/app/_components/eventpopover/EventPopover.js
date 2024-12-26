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
import { TimePicker } from "../timepicker";

function EventPopover({
  isOpen,
  onClose,
  date,
  options,
  setShifts,
  shift,
  setShift,
}) {
  const { title, startTime, endTime, members } = shift;

  const convertISOFormat = (date, time) => {
    return `${date.format("YYYY-MM-DD")}T${time}:00`;
  };

  const onChangeInput = (e) => {
    const { name, value } = e?.target;
    setShift((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeTime = (time) => {
    const { name, value } = time;
    setShift((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = () => {
    console.log({
      title,
      startTime: startTime?.format("YYYY-MM-DD HH:mm"),
      endTime: endTime?.format("YYYY-MM-DD HH:mm"),
      members,
    });
    onCloseModal();
  };

  const toggleOptions = (option) => {
    const newSelectedValue = members?.some(
      (member) => member?._id === option?._id
    )
      ? members.filter((value) => value?._id !== option?._id)
      : [...members, option];

    setShift((prev) => ({
      ...prev,
      members: newSelectedValue,
    }));
  };

  const isDisable = _.some([title, startTime, endTime, members], (item) =>
    _.isEmpty(item)
  );

  const removeOption = (option) => {
    // setAssignedMembers(
    //   assignedMembers.filter((value) => value?._id !== option?._id)
    // );
    setShift((prev) => ({
      ...prev,
      members: members.filter((value) => value?._id !== option?._id),
    }));
  };
  // console.log(convertISOFormat(date, startTime));
  const onCloseModal = () => {
    onClose();
    setShift({
      title: "",
      startTime: "",
      endTime: "",
      members: [],
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseModal}>
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
            </div>
          </div>
          <div className="w-full flex justify-between items-center gap-5">
            <TimePicker
              label={"Start Time"}
              timeKey={"startTime"}
              onChange={onChangeTime}
              date={date}
            />
            <TimePicker
              label={"End Time"}
              timeKey={"endTime"}
              onChange={onChangeTime}
              date={date}
            />
          </div>
          {/* <div className="w-full">
            <div className="flex gap-5 items-center justify-center">
              <div className="flex flex-col gap-1 w-1/2">
                <p className="text-base font-semibold">Start Time</p>
                <AddTime
                  onTimeSelect={onChangeTime}
                  timeKey={"startTime"}
                  compareTime={endTime}
                  value={startTime}
                />
              </div>

              <div className="flex flex-col gap-1 flex-1">
                <p className="text-base font-semibold">End Time</p>
                <AddTime
                  onTimeSelect={onChangeTime}
                  timeKey={"endTime"}
                  compareTime={startTime}
                  value={endTime}
                />
              </div>
            </div>
          </div> */}
          {/* <Input type="hidden" name="date" value={date} />
          <Input type="hidden" name="time" value={date} /> */}

          <MultiSelect
            options={options}
            selectedOptions={members}
            toggleOptions={toggleOptions}
            removeOption={removeOption}
          />
        </div>
        <DialogFooter>
          <Button
            className="text-lg px-8"
            onClick={onSave}
            disabled={isDisable}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EventPopover;
