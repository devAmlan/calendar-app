import { useEventStore } from "@/lib/store";

import React from "react";
import dayjs from "dayjs";

function Event({ date, events }) {
  const { openEventSummary } = useEventStore();

  const filteredEvents = events?.filter((event) => {
    return event?.date?.format("DD-MM-YY HH") === date.format("DD-MM-YY HH");
  });
  console.log(filteredEvents);
  return (
    <>
      {filteredEvents?.map((event) => (
        <div
          className="line-clamp-1 w-full cursor-pointer rounded-sm bg-primary p-1 text-sm text-white"
          key={event.id}
          onClick={(e) => {
            e.stopPropagation();
            openEventSummary(event);
          }}
        >
          {event?.title}
        </div>
      ))}
    </>
  );
}

export default Event;
