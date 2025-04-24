"use client";

import React, {useState} from "react";
import {FiArrowUpRight, FiDollarSign, FiMoreHorizontal} from "react-icons/fi";
import {FaRegCheckCircle} from "react-icons/fa";
import {RxCrossCircled} from "react-icons/rx";
import Map from "../ClusterMap/Map";
import {TagField} from "../TagInput/TagField";
import useTagInput from "@/hooks/useTag";
import { AmenitiesSuggestionList } from "@/data/suggestion_data";
import  ImageUploader  from "../FileUploader/ImageUploader";
export const ListingForm = () => {

    //define the MaxTags

    const MAX_TAGS = 10; // Set the maximum number of tags allowed

    //Retrieve all the returned items from the hook

    const {tags, handleAddTag, handleRemoveTag} = useTagInput(MAX_TAGS); // pass the maximum tags

    // Handle form submission

    const handleSubmit = () => {
        // Send tags to the backend
        console.log(tags);
    };
    const ReactTags = require('react-tag-input').WithOutContext;
    const [location,
        setLocation] = useState({lat: 0, lng: 0});
    return (
        <div className="col-span-10 p-4 rounded border border-stone-300">
            <form>
                <div className="space-y-12">
                    {/* Section 1 */}
                    <div
                        className="border-b border-gray-900/10 pb-12 grid grid-cols-1 sm:grid-cols-12 gap-x-8">
                        {/* Left Column: Context */}
                        <div className="sm:col-span-4">
                            <h2 className="text-base font-semibold text-gray-900">Address Details</h2>
                            <p className="mt-1 text-sm text-gray-600">
                                This information will be displayed publicly so be careful what you share.
                                <br/>
                                Please make sure to enter the correct address.
                            </p>
                        </div>

                        {/* Right Column: Input Fields */}
                        <div className="grid grid-cols-6 gap-y-8 gap-x-3 sm:col-span-8">
                            <div className="sm:col-span-6">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-900">
                                    Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                        placeholder="Enter address"/>
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">Country</label>
                                <div className="mt-2 grid grid-cols-1">
                                    <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>Mexico</option>
                                    </select>
                                    <svg
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        data-slot="icon">
                                        <path
                                            fill-rule="evenodd"
                                            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                            clip-rule="evenodd"/>
                                    </svg>
                                </div>
                            </div>

                            <div className="col-span-full ">
                                <label
                                    htmlFor="street-address"
                                    className="block text-sm/6 font-medium text-gray-900">Street address</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="street-address"
                                        id="street-address"
                                        autoComplete="street-address"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">City</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">State / Province</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="region"
                                        id="region"
                                        autoComplete="address-level1"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="postal-code"
                                    className="block text-sm/6 font-medium text-gray-900">ZIP / Postal code</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="postal-code"
                                        id="postal-code"
                                        autoComplete="postal-code"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <Map onLocationChange={setLocation}/>

                            </div>
                            <div className="sm:col-span-3 ">
                                <label htmlFor="latitude" className="block text-sm/6 font-medium text-gray-900">Latitude</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="latitude"
                                        id="latitude"
                                        disabled
                                        autoComplete="address-level1"
                                        defaultValue={location.lat || ""}
                                        className="block w-full rounded-md disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                </div>
                            </div>
                            <div className="sm:col-span-3 ">
                                <label
                                    htmlFor="longitude"
                                    className="block text-sm/6 font-medium text-gray-900">Longitude</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="longitude"
                                        id="longitude"
                                        disabled
                                        autoComplete="address-level1"
                                        value={location.lng || ""}
                                        className="block w-full disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="about"
                                    className="block col-span-full text-sm font-medium text-gray-900">
                                    About
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        name="about"
                                        id="about"
                                        rows={3}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                        placeholder="Write a few sentences about the properties."></textarea>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Section 2 */}
                    <div
                        className="border-b border-gray-900/10 pb-12 grid grid-cols-1 sm:grid-cols-12 gap-x-8">
                        {/* Left Column: Context */}
                        <div className="sm:col-span-4">
                            <h2 className="text-base font-semibold text-gray-900">Home Facts</h2>
                            <p className="mt-1 text-sm text-gray-600">
                                This information will be displayed publicly so be careful what you share.
                                <br/>
                                Information about building facts, interior, exterior, amenities , etc.
                            </p>
                        </div>

                        {/* Right Column: Input Fields */}
                        <div className="grid grid-cols-6 gap-y-8 gap-x-3 sm:col-span-8">
                            <div className="grid grid-cols-3  gap-x-4 col-span-6">
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
                                            min="0"/>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="baths"
                                        className="block text-sm font-medium text-gray-900 sm:col-span-3">
                                        Baths
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="baths"
                                            id="baths"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                            placeholder="0"
                                            min="0"/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="stories" className="block text-sm font-medium text-gray-900">
                                        Stories
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="Stories"
                                            id="Stories"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                            placeholder="0"
                                            min="0"/>
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="style" className="block text-sm/6 font-medium text-gray-900">Style</label>
                                <div className="mt-2 grid grid-cols-1">
                                    <select
                                        id="style"
                                        name="style"
                                        autoComplete="country-name"
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                        <option>House</option>
                                        <option>Condominium</option>
                                        <option>Apartment</option>
                                        <option>Mansion</option>
                                    </select>
                                    <svg
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        data-slot="icon">
                                        <path
                                            fill-rule="evenodd"
                                            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                            clip-rule="evenodd"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="sm:col-span-6"> 
                            <label htmlFor="stories" className="block text-sm font-medium text-gray-900">
                                        Amenities
                                    </label>
                                <div className="mt-2">
                                <TagField
                                        tags={tags}
                                        addTag={handleAddTag}
                                        removeTag={handleRemoveTag}
                                        maxTags={MAX_TAGS} 
                                        suggestions={AmenitiesSuggestionList}/>
                                    </div>
                            </div>

                        </div>
                    </div>

                    {/* Section 2 */}
                    <div
                        className="border-b border-gray-900/10 pb-12 grid grid-cols-1 sm:grid-cols-12 gap-x-8">
                        {/* Left Column: Context */}
                        <div className="sm:col-span-4">
                            <h2 className="text-base font-semibold text-gray-900">Images</h2>
                            <p className="mt-1 text-sm text-gray-600">
                                This information will be displayed publicly so be careful what you share.
                                <br/>
                                Photos and Landscape view of the properties
                            </p>
                        </div>

                        {/* Right Column: Input Fields */}
                        <div className="grid grid-cols-6 gap-y-8 gap-x-3 sm:col-span-8">
                           <div className="sm:col-span-full">
                            <ImageUploader defaultValue={[]}/>
                           </div>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div
                        className="border-b border-gray-900/10 pb-12 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                        {/* Left Column: Context */}
                        <div>
                            <h2 className="text-base font-semibold text-gray-900">Notifications</h2>
                            <p className="mt-1 text-sm text-gray-600">
                                We'll always let you know about important changes, but you pick what else you
                                want to hear about.
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
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                        <label htmlFor="comments" className="text-sm font-medium text-gray-900">
                                            Comments
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="candidates"
                                            name="candidates"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                        <label htmlFor="candidates" className="text-sm font-medium text-gray-900">
                                            Candidates
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="offers"
                                            name="offers"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
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
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
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

const TableRow = ({email, name, joinDate, hasPurchasedHouse, order} : {
    email: string;
    name: string;
    joinDate: string;
    hasPurchasedHouse: string;
    order: number;
}) => {
    return (
        <tr
            className={order % 2
            ? "bg-stone-100 text-sm"
            : "text-sm"}>
            <td className="p-1.5">
                <a href="#" className="text-violet-600 underline flex items-center gap-1">
                    {email}
                    <FiArrowUpRight/>
                </a>
            </td>
            <td className="p-1.5">{name}</td>
            <td className="p-1.5">{joinDate}</td>
            <td className="p-1.5">
                {hasPurchasedHouse === ""
                    ? (<RxCrossCircled className="text-xl text-red-500"/>)
                    : (<FaRegCheckCircle className="text-xl text-green-500"/>)}
            </td>
            <td className="w-8">
                <button
                    className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
                    <FiMoreHorizontal/>
                </button>
            </td>
        </tr>
    );
};