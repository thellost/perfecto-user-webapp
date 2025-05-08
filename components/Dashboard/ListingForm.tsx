"use client";

import React, {useState, useEffect, useRef, use} from "react";
import { convertCompassFormat, convertToCompassFormat } from "@/lib/utils/dataformat";
import { toast } from "react-toastify";
import Map from "../ClusterMap/Map";
import {TagField} from "../TagInput/TagField";
import useTagInput from "@/hooks/useTag";
import { AmenitiesSuggestionList } from "@/data/suggestion_data";
import  ImageUploader  from "../FileUploader/ImageUploader";
import KeyValueForm from "../KeyValue/PropertyInformation";
import { keyValuePair } from "../KeyValue/PropertyInformation";
import { useSession } from "next-auth/react";

// Add this type definition at the top of the file
type ListingData = {
  name?: string;
  image?: string;
  price?: number;
  address?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  schools?: any;
  propertyListingDetails?: any;
  amenities?: string[];
  homeFacts?: {
    yearBuilt?: string;
    lotSize?: string;
    apn?: string;
    totalFinishedSqFt?: string;
    aboveGradeFinishedSqFt?: string;
    stories?: string;
  };
  latitude?: number;
  longitude?: number;
  description?: string;
  propertyInformation?: any;
  propertyImages?: string[];
};

export const ListingForm = () => {
  const { data: session } = useSession();

    //define the MaxTags

    const MAX_TAGS = 10; // Set the maximum number of tags allowed

    //Retrieve all the returned items from the hook

    const {tags, handleAddTag, handleRemoveTag, changeTags} = useTagInput(MAX_TAGS); // pass the maximum tags

    // Handle form submission

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!session) {
        toast.error('Please login to create a listing');
        return;
      }
    
      const formData: ListingData = {
        // Basic Information
        name: addressRef.current?.value || "",
        price: Number(price.current?.value) || 0,
        address: addressRef.current?.value || "",
        beds: Number(bedNumberRef.current?.value) || 0,
        baths: Number(bathNumberRef.current?.value) || 0,
        sqft: Number(totalFinishedSqft.current?.value) || 0,
        
        // Location Information
        latitude: location.lat,
        longitude: location.lng,
        
        // Description
        description: descriptionRef.current?.value || "",
        
        // Home Facts
        homeFacts: {
          yearBuilt: yearBuilt.current?.value,
          lotSize: lotsize.current?.value,
          apn: apn.current?.value,
          totalFinishedSqFt: totalFinishedSqft.current?.value,
          aboveGradeFinishedSqFt: aboveGradeFinishedSqft.current?.value,
          stories: stories.current?.value,
        },
        
        // Amenities from tags
        amenities: tags,
        
        // Property Information from KeyValueForm
        propertyInformation: convertToCompassFormat(propertyInformation),
        
        // Images
        propertyImages: ImageList.map((image) => image.url),
      };
    
      // Log the collected data
      console.log("Submitting listing data:", formData);
    
      try {
        const response = await fetch('/api/crud/createListing', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            // NextAuth automatically handles the Authorization header
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to create listing');
        }
  
        const result = await response.json();
        toast.success('Listing created successfully!');
        // Optional: Redirect to the new listing
        // router.push(`/listings/${result.listingId}`);
  
      } catch (error) {
        console.error('Error:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to create listing');
      }
    };
    const ReactTags = require('react-tag-input').WithOutContext;
    const [location,
        setLocation] = useState({lat: 37.7749, lng: -122.4194});
    const [scrapeUrl, setScrapeUrl] = useState<string>("");
    const [scrapedData, setScrapedData] = useState<any>(null);
    const [isScraping, setIsScraping] = useState(false);
    const [ImageList, setImageList] = useState<{
        url: string;
        name?: string;
    }[]>([]);
    const [propertyInformation, setPropertyInformation] = useState<keyValuePair>([
      {
        key: "Category",
        parents: [
          {
            key: "Feature",
            pairs: [
              { key: "name", value: "John Doe" },
              { key: "email", value: "john.doe@example.com" },
            ],
          },
          {
            key: "Location",
            pairs: [
              { key: "city", value: "New York" },
              { key: "address", value: "123 Main St" },
            ],
          },
        ],
      },
    ]);
    // Refs for form fields you want to update
    const addressRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const regionRef = useRef<HTMLInputElement>(null);
    const postalRef = useRef<HTMLInputElement>(null);
    const bathNumberRef = useRef<HTMLInputElement>(null);
    const bedNumberRef = useRef<HTMLInputElement>(null);
    const yearBuilt = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const lotsize = useRef<HTMLInputElement>(null);
    const apn = useRef<HTMLInputElement>(null);
    const totalFinishedSqft = useRef<HTMLInputElement>(null);
    const aboveGradeFinishedSqft = useRef<HTMLInputElement>(null);
    const stories = useRef<HTMLInputElement>(null);
    const price = useRef<HTMLInputElement>(null);

    // When scrapedData changes, update the form fields
    useEffect(() => {
        if (scrapedData) {
            if (addressRef.current && scrapedData.address) addressRef.current.value = scrapedData.address;
            if (cityRef.current && scrapedData.city) cityRef.current.value = scrapedData.city;
            if (regionRef.current && scrapedData.region) regionRef.current.value = scrapedData.region;
            if (postalRef.current && scrapedData.postalCode) postalRef.current.value = scrapedData.postalCode;
            if (scrapedData.latitude && scrapedData.longitude) setLocation({lng: scrapedData.longitude, lat: scrapedData.latitude});
            if (scrapedData.propertyImages) {
                console.log("Scraped Images:", scrapedData.propertyImages);
                setImageList(scrapedData.propertyImages.map((image: { url: string; name?: string }) => ({url: image, name: image|| null})))};
            if (scrapedData.amenities) {
                let valuesList: string[] = Object.values(scrapedData.amenities);
                changeTags(valuesList);
                
            if (bedNumberRef.current && scrapedData.bedNumber) bedNumberRef.current.value = scrapedData.beds;
            if (bathNumberRef.current && scrapedData.bathNumber) bathNumberRef.current.value = scrapedData.baths;
            if (yearBuilt.current && scrapedData.yearBuilt) yearBuilt.current.value = scrapedData.homeFacts.yearBuilt;
            if (descriptionRef.current && scrapedData.description) descriptionRef.current.value = scrapedData.description;
            if (lotsize.current && scrapedData.lotsize) lotsize.current.value = scrapedData.homeFacts.lotsize;
            if (apn.current && scrapedData.apn) apn.current.value = scrapedData.homeFacts.apn;
            if(totalFinishedSqft.current && scrapedData.totalFinishedSqft) totalFinishedSqft.current.value = scrapedData.homeFacts.totalFinishedSqFt;
            if(aboveGradeFinishedSqft.current && scrapedData.aboveGradeFinishedSqft) aboveGradeFinishedSqft.current.value = scrapedData.homeFacts.aboveGradeFinishedSqFt;
            if (stories.current && scrapedData.stories) stories.current.value = scrapedData.homeFacts.stories;
            if (price.current && scrapedData.price) price.current.value = scrapedData.price;
            };
            
            // You can update more fields as needed
        }
    }, [scrapedData]);
    const handleScrape = async () => {
        if (!scrapeUrl) {
            toast.error("Please enter a valid URL.");
            return;
        }
        setIsScraping(true);
        try {
            const response = await fetch(`/api/scrape/compass?url=${encodeURIComponent(scrapeUrl)}`);
            if (!response.ok) throw new Error("Failed to fetch data from the scrape API.");
            const data = await response.json();
            setScrapedData(data);
            if (data.propertyInformation) {
              setPropertyInformation(convertCompassFormat(data.propertyInformation));
              console.log("Property Information:", propertyInformation);
            }
            
            setIsScraping(false);
            toast.success("Data successfully scraped and applied to the form!");
        } catch (error) {
          console.log(error);
          setIsScraping(false);
            toast.error("Failed to scrape data. Please try again.");
        }
    };


    //// key value pair
    
    return (
        <div className="flex flex-col col-span-full w-full md:flex-row gap-6">
            {/* Main Form */}
            <div className="flex-1 col-span-10 p-4 rounded border border-stone-300">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-12">
                        {/* Section 1 */}
                        <div
                            className="border-b border-gray-900/10 pb-12 grid grid-cols-1 sm:grid-cols-12 gap-x-8">
                            {/* Left Column: Context */}
                            <div className="sm:col-span-3">
                                <p className="mt-1 text-sm text-gray-600">
                                    This information will be displayed publicly so be careful what you share.
                                    <br/>
                                    Please make sure to enter the correct address.
                                </p>
                            </div>

                            {/* Right Column: Input Fields */}
                            <div className="grid grid-cols-6 gap-y-8 gap-x-3 sm:col-span-9">
                                <div className="sm:col-span-6">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-900">
                                        Address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            ref={addressRef}
                                            defaultValue={scrapedData?.address || ""}
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
                                            ref={cityRef}
                                            defaultValue={scrapedData?.city || ""}
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
                                            ref={regionRef}
                                            defaultValue={scrapedData?.region || ""}
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
                                            ref={postalRef}
                                            defaultValue={scrapedData?.postalCode || ""}
                                            autoComplete="postal-code"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <Map onLocationChange={setLocation} parent_latitude={location.lat} parent_longitude={location.lng}/>

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
                                        htmlFor="description"
                                        className="block col-span-full text-sm font-medium text-gray-900">
                                        Description
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            name="description"
                                            id="description"
                                            ref={descriptionRef}
                                            defaultValue={scrapedData?.description || ""}
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
                            <div className="sm:col-span-3">
                                <h2 className="text-base font-semibold text-gray-900">Home Facts</h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    This information will be displayed publicly so be careful what you share.
                                    <br/>
                                    Information about building facts, interior, exterior, amenities , etc.
                                </p>
                            </div>

                            {/* Right Column: Input Fields */}
                            <div className="grid grid-cols-6 gap-y-8 gap-x-3 sm:col-span-9">
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
                                                ref={bedNumberRef}
                                                defaultValue={scrapedData?.beds || ""}
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
                                                ref={bathNumberRef}
                                                defaultValue={scrapedData?.beds || ""}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                                placeholder="0"
                                                min="0"/>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="stories"
                                            className="block text-sm font-medium text-gray-900 sm:col-span-3">
                                            Stories
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                name="stories"
                                                id="stories"
                                                ref={stories}
                                                defaultValue={scrapedData?.homeFacts?.stories || ""}
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
                                    <label htmlFor="year-built" className="block text-sm font-medium text-gray-900">
                                        Year Built
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="year-built"
                                            id="year-built"
                                            ref={yearBuilt}
                                            defaultValue={scrapedData?.homeFacts?.yearBuilt || ""}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                            placeholder="0"
                                            min="0"/>
                                    </div>
                                </div>
                                <div className="sm:col-span-6 grid grid-cols-3 gap-x-4">
                                    <div>
                                        <label htmlFor="total-finished-sqft" className="block text-sm font-medium text-gray-900">
                                            Total Finished SqFt
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                name="total-finished-sqft"
                                                id="total-finished-sqft"
                                                ref={totalFinishedSqft}
                                                defaultValue={scrapedData?.homeFacts?.totalFinishedSqFt || ""}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                                placeholder="0"
                                                min="0"/>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="above-grade-finished-sqft" className="block text-sm font-medium text-gray-900">
                                            Above Grade Finished SqFt
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                name="above-grade-finished-sqft"
                                                id="above-grade-finished-sqft"
                                                ref={aboveGradeFinishedSqft}
                                                defaultValue={scrapedData?.homeFacts?.aboveGradeFinishedSqFt || ""}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                                placeholder="0"
                                                min="0"/>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="lot-size" className="block text-sm font-medium text-gray-900">
                                            Lot Size
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                name="lot-size"
                                                id="lot-size"
                                                ref={lotsize}
                                                defaultValue={scrapedData?.homeFacts?.lotSize || ""}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                                placeholder="0"
                                                min="0"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label htmlFor="apn" className="block text-sm font-medium text-gray-900">
                                        APN
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="apn"
                                            id="apn"
                                            ref={apn}
                                            defaultValue={scrapedData?.homeFacts?.aPN || ""}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                            placeholder="Enter APN"/>
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-900">
                                        Price (USD)
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            ref={price}
                                            defaultValue={scrapedData?.price || ""}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                            placeholder="Enter price in USD"
                                            min="0"/>
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label htmlFor="amenities" className="block text-sm font-medium text-gray-900">
                                        Amenities
                                    </label>
                                    <div className="mt-2">
                                        <TagField
                                            tags={tags}
                                            addTag={handleAddTag}
                                            removeTag={handleRemoveTag}
                                            maxTags={MAX_TAGS}
                                            suggestions={AmenitiesSuggestionList}
                                        />
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
                                    <ImageUploader defaultValue={ImageList} onValueChange ={setImageList}/>
                                </div>
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div
                            className="border-b border-gray-900/10 pb-12 grid grid-cols-1 gap-x-6">
                            {/* Context */}
                            <div>
                                <h2 className="text-base font-semibold text-gray-900">Notifications</h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    We'll always let you know about important changes, but you pick what else you
                                    want to hear about.
                                </p>
                            </div>

                            {/* Input Fields */}
                            <div className="w-full">
                                <KeyValueForm defaultValue={propertyInformation} />
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

            {/* Scrape Card */}
            <div className="w-full c md:w-96 p-4 rounded border border-stone-300 bg-gray-50 h-fit">
                <h2 className="text-lg font-semibold text-gray-900">Scrape Listing Data</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Enter a URL from <strong>compass.com</strong> to scrape listing data and apply it to the form.
                </p>
                <div className="mt-4">
                    <label htmlFor="scrape-url" className="block text-sm font-medium text-gray-900">
                        Compass Listing URL
                    </label>
                    <input
                        type="text"
                        id="scrape-url"
                        name="scrape-url"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                        placeholder="https://www.compass.com/listing/..."
                        value={scrapeUrl}
                        onChange={(e) => setScrapeUrl(e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <button
                        type="button"
                        onClick={handleScrape}
                        disabled={isScraping}
                        className={`w-full rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
                            isScraping
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        }`}
                    >
                        {isScraping ? "Scraping..." : "Scrape Data"}
                    </button>
                </div>
            </div>
        </div>
    );
};