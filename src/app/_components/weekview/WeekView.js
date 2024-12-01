import React from "react";
import { getHours, getWeekDays } from "@/lib/getTime";
import { useDateStore, useEventStore } from "@/lib/store";
import { ScrollArea } from "@/components/ui/scroll-area";

function WeekView() {
  const { openPopover, events } = useEventStore();
  const { userSelectedDate, setDate } = useDateStore();

  return (
    <>
      <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] place-items-center px-4 py-2">
        <div className="w-16 border-r border-gray-300">
          <div className="relative h-16">
            <div className="absolute top-2 text-xs text-gray-600">GMT +2</div>
          </div>
        </div>
        {getWeekDays(userSelectedDate).map(({ currentDate, today }, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-xs">{currentDate.format("ddd")}</div>
            <div className="h-12 w-12 rounded-full p-2 text-2xl">
              {currentDate.format("DD")}
            </div>
          </div>
        ))}
      </div>

      <ScrollArea className="h-[70vh]">
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] px-4 py-2">
          <div className="w-16 border-r border-gray-300">
            {getHours.map((hour, index) => (
              <div key={index} className="relative h-16">
                <div className="absolute -top-2 text-xs text-gray-600">
                  {hour.format("HH:mm")}
                </div>
              </div>
            ))}
          </div>

          {getWeekDays(userSelectedDate)?.map(
            ({ isCurrentDay, today }, index) => {
              const dayDate = userSelectedDate
                .startOf("week")
                .add(index, "day");

              return (
                <div key={index} className="relative border-r border-gray-300">
                  {getHours?.map((hour, index) => (
                    <div
                      key={index}
                      className="relative flex h-16 cursor-pointer flex-col items-center gap-y-2 border-b border-gray-300 hover:bg-gray-100"
                      onClick={() => {
                        setDate(dayDate.hour(hour.hour()));
                        openPopover();
                      }}
                    ></div>
                  ))}
                </div>
              );
            }
          )}
        </div>
      </ScrollArea>
    </>
  );
}

export default WeekView;
