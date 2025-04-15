import React from "react";
import { AccountToggle } from "./AccountToggle";
import { Search } from "./Search";
import { RouteSelect } from "./RouteSelect";
import { Plan } from "./Plan";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <div className="overflow-y-scroll sticky top-4 pr-4 h-[calc(100vh-32px-48px)] w-fit">
      {/* Logo Section */}
      <Link href="/">
      <div className="mb-4 flex  items-center justify-start text-xl font-bold text-stone-800">
        <img
          src="/images/Logo.png" // Update the path if needed
          alt="Logo"
          className="object-contain h-16 w-auto"
        />
        PERFECTO
      </div>
      </Link>
      <AccountToggle />
      <Search />
      <RouteSelect />
    </div>
  );
};
