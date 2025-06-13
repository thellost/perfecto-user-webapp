"use client"
import React from "react";
import { IconType } from "react-icons";
import {
  FiDollarSign,
  FiHome,
  FiLink,
  FiPaperclip,
  FiUsers,
} from "react-icons/fi";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from "next-auth/react";

type list_item = {
  path: string;
  title: string;
  Icon: IconType;
  roles?: string[]; // Add roles array to specify which roles can see this route
}

const list: list_item[] = [
  {
    path: "/referral-dashboard",
    title: "Referral Dashboard",
    Icon: FiHome,
    roles: ["agent", "admin"] // Only agents and admins can see this
  },
  {
    path: "/profile",
    title: "Profile",
    Icon: FiUsers,
    roles: ["buyer", "agent", "admin"] // All authenticated users can see this
  },
  {
    path: "/user-listing",
    title: "Listing",
    Icon: FiPaperclip,
    roles: ["agent", "admin"] // Only agents and admins can see listings
  },
  {
    path: "/user-integrations",
    title: "Integrations",
    Icon: FiLink,
    roles: ["agent", "admin"]
  },
  {
    path: "/offerings",
    title: "Offerings",
    Icon: FiLink,
    roles: ["buyer", "agent", "admin"] // All authenticated users can see offerings
  },
];

export const RouteSelect = () => {
  const section_name = usePathname();
  const { data: session } = useSession();
  const userRole = session?.roles || "user"; // Default to "user" if no role is set

  // Filter routes based on user role
  const allowedRoutes = list.filter(route => 
    !route.roles || route.roles.includes(userRole)
  );

  return (
    <div className="space-y-1">
      {allowedRoutes.map((data, i) => (
        <Route
          key={i}
          Icon={data.Icon}
          selected={data.path === section_name}
          title={data.title}
          path={data.path}
        />
      ))}
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
  path
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  path: string;
}) => {
  return (
    <Link href={path} className="">
    <button
      className={`flex items-center cursor-pointer justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`}
    >
      <Icon className={selected ? "text-violet-500" : ""} />
      <span>{title}</span>
    </button>
    </Link>
  );
};
