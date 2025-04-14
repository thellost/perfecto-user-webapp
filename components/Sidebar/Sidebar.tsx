import React from "react";
import { AccountToggle } from "./AccountToggle";
import { Search } from "./Search";
import { RouteSelect } from "./RouteSelect";
import { Plan } from "./Plan";

export const Sidebar = () => {
  return (
      <div className="overflow-y-scroll sticky top-4 pr-4 h-[calc(100vh-32px-48px)] w-fit ">
        <AccountToggle />
        <Search />
        <RouteSelect/>
      </div>
  );
};
