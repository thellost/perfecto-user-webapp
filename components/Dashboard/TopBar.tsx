import React from "react";
import { FiCalendar } from "react-icons/fi";
import NotificationBell from "../Notification/Notification";

export const TopBar = ( {name}:{name:string} ) => {
  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">🚀 Hello, {name}!</span>
          <span className="text-xs block text-stone-500">
           {Date()}
          </span>
        </div>
        <div className="flex text-sm items-center gap-2" >
          <NotificationBell></NotificationBell>
        <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">

          <FiCalendar />
          <span>All time</span>
        </button></div>
      </div>
    </div>
  );
};
