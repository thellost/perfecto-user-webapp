"use client";

import React from "react";
import { FiArrowUpRight, FiDollarSign, FiMoreHorizontal } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

export const ListingForm = () => {
  return (
    <div className="col-span-10 p-4 rounded border border-stone-300">
      <form>
        <div className="space-y-12">
          {/* Section 1 */}
          <div className="border-b border-gray-900/10 pb-12 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            {/* Left Column: Context */}
            <div>
              <h2 className="text-base font-semibold text-gray-900">Create Listing</h2>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>

            {/* Right Column: Input Fields */}
            <div className="grid grid-cols-1 gap-y-8">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-900">
                  Address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    placeholder="Enter address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-900">
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    name="about"
                    id="about"
                    rows={3}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    placeholder="Write a few sentences about yourself."
                  ></textarea>
                </div>
              </div>

              {/* Side-by-Side Inputs for Baths and Bedrooms */}
              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-900">
                    Bedrooms
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="bedrooms"
                      id="bedrooms"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="baths" className="block text-sm font-medium text-gray-900">
                    Baths
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="baths"
                      id="baths"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="border-b border-gray-900/10 pb-12 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            {/* Left Column: Context */}
            <div>
              <h2 className="text-base font-semibold text-gray-900">Personal Information</h2>
              <p className="mt-1 text-sm text-gray-600">
                Use a permanent address where you can receive mail.
              </p>
            </div>

            {/* Right Column: Input Fields */}
            <div className="grid grid-cols-1 gap-y-8">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="border-b border-gray-900/10 pb-12 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            {/* Left Column: Context */}
            <div>
              <h2 className="text-base font-semibold text-gray-900">Notifications</h2>
              <p className="mt-1 text-sm text-gray-600">
                We'll always let you know about important changes, but you pick what else you want
                to hear about.
              </p>
            </div>

            {/* Right Column: Input Fields */}
            <div className="grid grid-cols-1 gap-y-8">
              <fieldset>
                <legend className="text-sm font-semibold text-gray-900">By email</legend>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="comments" className="text-sm font-medium text-gray-900">
                      Comments
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="candidates" className="text-sm font-medium text-gray-900">
                      Candidates
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="offers" className="text-sm font-medium text-gray-900">
                      Offers
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
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
        <th className="text-start p-1.5">Purchased</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({ email, name, joinDate, hasPurchasedHouse, order }: { email: string; name: string; joinDate: string; hasPurchasedHouse: string; order: number; }) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">
        <a href="#" className="text-violet-600 underline flex items-center gap-1">
          {email}
          <FiArrowUpRight />
        </a>
      </td>
      <td className="p-1.5">{name}</td>
      <td className="p-1.5">{joinDate}</td>
      <td className="p-1.5">
        {hasPurchasedHouse === "" ? (
          <RxCrossCircled className="text-xl text-red-500" />
        ) : (
          <FaRegCheckCircle className="text-xl text-green-500" />
        )}
      </td>
      <td className="w-8">
        <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
          <FiMoreHorizontal />
        </button>
      </td>
    </tr>
  );
};