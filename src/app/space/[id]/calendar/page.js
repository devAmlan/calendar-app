import React from "react";
import Calendar from "@/app/_components/calendar";
import { getCalandarData, getEmployes } from "./useCalendar";
import Mainview from "@/app/_components/mainview";

function page() {
  return (
    <div className="w-full p-10">
      {/* <Calendar columnData={getCalandarData()} rowData={getEmployes()} /> */}
      <Mainview />
    </div>
  );
}

export default page;
