"use client";
import React from "react";
import { useDateStore, useEventStore, useViewStore } from "@/lib/store";
import EventSummary from "../eventsummary/EventSummary";
import EventPopover from "../eventpopover/EventPopover";
import WeekView from "../weekview/Weekview";
function Mainview() {
  const { selectedView } = useViewStore();
  const {
    isPopoverOpen,
    closePopover,
    isEventSummaryOpen,
    closeEventSummary,
    selectedEvent,
    setEvents,
  } = useEventStore();

  const { userSelectedDate } = useDateStore();

  return (
    <div className="flex">
      <div className="w-full flex-1">
        <WeekView />
      </div>

      {isPopoverOpen && (
        <EventPopover
          isOpen={true}
          onClose={closePopover}
          date={userSelectedDate.format("YYYY-MM-DD")}
        />
      )}

      {isEventSummaryOpen && selectedEvent && (
        <EventSummary
          isOpen={isEventSummaryOpen}
          onClose={closeEventSummary}
          event={selectedEvent}
        />
      )}
    </div>
  );
}

export default Mainview;
