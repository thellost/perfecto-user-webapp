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
import Link from 'next/link'
import { usePathname } from 'next/navigation'


type list_item = {
  path:string,
  title: string,
  Icon: IconType
}
const list: list_item[]  = [
  {
    path:"/referral-dashboard",
    title : "Referral Dahsboard",
    Icon : FiHome
  },
  {
    
    path:"/profile",
    title : "Profile",
    Icon : FiUsers
  },
  {
    
    path:"/user-listing",
    title : "Listing",
    Icon : FiPaperclip
  },
  {
    
    path:"/user-integrations",
    title : "Integrations",
    Icon : FiLink
  },
  {
    
    path:"/user-finance",
    title : "Finance",
    Icon : FiLink
  },
]
export const RouteSelect = () => {
  const section_name = usePathname()
  console.log(section_name)
  return (
    <div className="space-y-1">
      {list.map(function(data, i){
        return <Route  Icon={data.Icon} selected={data.path == section_name ? true : false} title={data.title} path={data.path} />;
    })} 
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
    <Link href={path}>
    <button
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
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
