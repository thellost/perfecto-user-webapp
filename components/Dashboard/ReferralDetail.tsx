import React from "react";
import { FiArrowUpRight, FiDollarSign, FiMoreHorizontal } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
export const ReferralDetail = () => {
  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiDollarSign /> Recent Transactions
        </h3>
        <button className="text-sm text-violet-500 hover:underline">
          See all
        </button>
      </div>
      <table className="w-full table-auto">
        <TableHead />

        <tbody>
          <TableRow
            email="sam@gmail.com"
            name="Sam Simpson"
            joinDate="Aug 2nd"
            hasPurchasedHouse="No"
            order={1}
          />
          <TableRow
            email="and.rs@gmail.com"
            name="Anders King"
            joinDate="Aug 2nd"
            hasPurchasedHouse=""
            order={2}
          />
          <TableRow
            email="luke-sky@gmail.com"
            name="Lukas Spencer"
            joinDate="Aug 1st"
            hasPurchasedHouse="$21.25"
            order={3}
          />
          <TableRow
            email="forearm@gmail.com"
            name="Marquis Foreman"
            joinDate="Aug 1st"
            hasPurchasedHouse=""
            order={4}
          />
          <TableRow
            email="westin.prz@gmail.com"
            name="Westin Perez"
            joinDate="Aug 1st"
            hasPurchasedHouse=""
            order={5}
          />
          <TableRow
            email="shopping.grant@gmail.com"
            name="Sophie Grant"
            joinDate="Jul 31st"
            hasPurchasedHouse=""
            order={6}
          />
        </tbody>
      </table>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Email</th>
        <th className="text-start p-1.5">Name</th>
        <th className="text-start p-1.5">Join Date</th>
        <th className="text-start p-1.5">Price</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  email,
  name,
  joinDate,
  hasPurchasedHouse,
  order,
}: {
  email: string;
  name: string;
  joinDate: string;
  hasPurchasedHouse: string;
  order: number;
}) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">
        <a
          href="#"
          className="text-violet-600 underline flex items-center gap-1"
        >
          {email} <FiArrowUpRight />
        </a>
      </td>
      <td className="p-1.5">{name}</td>
      <td className="p-1.5">{joinDate}</td>
      <td className="p-1.5">{hasPurchasedHouse === "" ? <RxCrossCircled className="text-xl text-red-500"/> :<FaRegCheckCircle className="text-xl text-green-500"/> }</td>
      <td className="w-8">
        <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
          <FiMoreHorizontal />
        </button>
      </td>
    </tr>
  );
};
