"use client";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import { Trash2, Pencil } from "lucide-react";
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

function EventSummary({ isOpen, onClose, event }) {
  const eventDate = dayjs(event?.date).format("dddd, MMMMM D, YYYY h:mm A");
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-start items-start gap-5">
            <Trash2 className="cursor-pointer w-5 h-5" />
            <Pencil className="cursor-pointer w-5 h-5" />
          </DialogTitle>
        </DialogHeader>
        <div className="py-3 flex flex-col gap-4">
          <h3 className="text-xl text-primary font-bold">{event?.title}</h3>
          <div className="flex justify-start items-center gap-5">
            <h5 className="text-lg text-black/40 font-semibold">
              {dayjs(event?.date).format("dddd,DD MMM")}
            </h5>
            {/* <h5 className="text-lg text-black/40 font-semibold">{eventDate}</h5> */}
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
  );
}

export default EventSummary;
