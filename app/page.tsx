'use client'
import React, {useState, useEffect, useCallback} from "react";
import Navbar from "../components/Navbar/Navbar"
import Cards from "../components/Cards/Cards";
import Search from "../components/Search/Search";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding, faLocation} from "@fortawesome/free-solid-svg-icons";
import cities from "../data-mock/csvjson.json";
import Banner from "@/public/images/hero.jpg";
import Footer from "../components/Footer/Footer";
import type {City, SearchList, Properties}
from "@/app/types/DefaultType"
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
const recommendedProperties = [
    {
        "id": 2,
        "name": "16101 South Kennedy Road",
        "image": "https://www.compass.com/m/d569c71f163591c9871c1e2346d174fa056962e7_img_0_28002/6" +
            "40x480.jpg",
        "price": 4500000,
        "address": "16101 South Kennedy Road, Los Gatos, CA 95030",
        "postalCode": "95030",
        "city": "Los Gatos",
        "state": "CA",
        "region": "Silicon Valley",
        "beds": 4,
        "baths": 3.5,
        "sqft": 3562,
        "comingSoon": "soon",
        "monthlyPayment": 212000,
        "downPayment": 500000,
        "terms": "27",
        "stateid": 1
    }
]
const Home = () => {
    
    const { data: session } = useSession({
        required: false,
        onUnauthenticated() {
        },
    })
    console.log(session)
    const [value,
        setValue] = useState < string > ("");
    const [places,
        setPlaces] = useState < City[] > ([]);
    const [buildings,
        setBuildings] = useState < Properties[] > ([]);
    const [recommendedproperties,
        setRecommendedproperties] = useState < Properties[] > ([]);
    const [isLoading,
        setIsLoading] = useState < boolean > (false);

    useEffect(() => {
        const fetchPropertyDetails = async() => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/recommendedProperties`);
                if (!response.ok) {
                    throw new Error("Failed to fetch property details");
                }
                const data = await response.json();
                setRecommendedproperties(data);
            } catch (error) {

                console.error("Error fetching property details:", error);
            }
        };
        fetchPropertyDetails();
    }, []);



    const fetchSuggestions = async(searchValue : string | RegExp) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/search?address=${searchValue}`);
            const responseData = await response.json();
            const suggestedCities = (cities as SearchList).data
                ?.filter((city : {
                    city: string;
                }) => {
                    const regex = new RegExp(searchValue, "i");
                    return regex.test(city.city);
                }).slice(0, 5);

            setPlaces(suggestedCities);
            setBuildings(() => responseData.map((res : {
                id: any;
                name: any;
                state: any;
            }) => {
                return {id: res.id, name: res.name, state: res.state};
            }));
        } catch (error) {
            console.error("Error performing search:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const debounce = (func : {
        (searchValue : any): Promise < void >;
        apply?: any;
    }, delay : number | undefined) => {
        let debounceTimer : string | number | NodeJS.Timeout | undefined;
        return function (...args : any) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(args), delay);
        };
    };

    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

    useEffect(() => {
        if (value) {
            debouncedFetchSuggestions(value);
        }
    }, [value, debouncedFetchSuggestions]);

    return (
        <div className="min-h-screen overflow-x-hidden relative">
            <div className="absolute w-full z-10 px-4">
                <Navbar
                    searchedValue={undefined}
                    setSearch={undefined}
                    onPlaceSelect={undefined}
                    properties={undefined}
                    setProperties={undefined}/>
            </div>
            <div
                className="relative flex justify-center items-center text-white"
                style={{
                backgroundImage: `url(${Banner.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '98vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative text-center">
                    <h1 className="sm:text-5xl text-3xl font-semibold">
                        Find Your Perfecto Home
                    </h1>
                    <div
                        className="relative inline-block mt-4 sm:mt-6 text-black max-w-3xl w-[70vw]">
                        <Search setSearch={setValue}/> {value && !isLoading && (
                            <div
                                className="suggestion-box bg-white max-h-[40vh] overflow-y-scroll border border-gray-300 rounded-lg shadow-md p-4 w-full mt-2 max-w-3xl absolute top-full">
                                {places.length > 0 && (
                                    <div className="mb-4 text-left">
                                        <div className="text-gray-800 font-bold mb-2 flex items-center gap-2">
                                            <FontAwesomeIcon icon={faLocation}/>
                                            Places
                                        </div>
                                        {places.map((data : City, index) => (
                                            <Link href={`'/buy${ "$" + data}'`}>
                                                <div
                                                    key={index}
                                                    className="p-2 cursor-pointer hover:bg-gray-100 transition ease-in-out">
                                                    <div className="font-semibold">{data
                                                            ?.city}</div>
                                                    <div className="text-gray-500">{data
                                                            ?.state_id}</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {buildings.length > 0 && (
                                    <div className="mb-4 text-left mt-4">
                                        <div className="text-gray-800 font-bold mb-2 flex gap-2 items-center">
                                            <FontAwesomeIcon icon={faBuilding}/>
                                            Buildings
                                        </div>
                                        {buildings.map((data : Properties, index) => (
                                            <Link href={`'/property-details/${data.id}'`}>
                                                <div
                                                    key={index}
                                                    className="p-2 cursor-pointer hover:bg-gray-100 transition ease-in-out">
                                                    <div className="font-semibold">{data.address}</div>
                                                    <div className="text-gray-500">{data.state}</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="px-4 md:px-20">
                <div className="py-[90px]">
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-black text-2xl md:text-3xl font-semibold text-center">Our Mission</h2>
                        <div className="sm:w-[170px] w-[135px] border-b-4 border-[#f08e80]"></div>
                    </div>
                    <p className="mt-4 text-lg text-center">We're on a mission to transform the real estate industry by:</p>
                    <div
                        className="sm:mt-6 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 640 512"
                                className="text-4xl mx-auto text-[#f08e80] mb-4"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M621.16 54.46C582.37 38.19 543.55 32 504.75 32c-123.17-.01-246.33 62.34-369.5 62.34-30.89 0-61.76-3.92-92.65-13.72-3.47-1.1-6.95-1.62-10.35-1.62C15.04 79 0 92.32 0 110.81v317.26c0 12.63 7.23 24.6 18.84 29.46C57.63 473.81 96.45 480 135.25 480c123.17 0 246.34-62.35 369.51-62.35 30.89 0 61.76 3.92 92.65 13.72 3.47 1.1 6.95 1.62 10.35 1.62 17.21 0 32.25-13.32 32.25-31.81V83.93c-.01-12.64-7.24-24.6-18.85-29.47zM48 132.22c20.12 5.04 41.12 7.57 62.72 8.93C104.84 170.54 79 192.69 48 192.69v-60.47zm0 285v-47.78c34.37 0 62.18 27.27 63.71 61.4-22.53-1.81-43.59-6.31-63.71-13.62zM320 352c-44.19 0-80-42.99-80-96 0-53.02 35.82-96 80-96s80 42.98 80 96c0 53.03-35.83 96-80 96zm272 27.78c-17.52-4.39-35.71-6.85-54.32-8.44 5.87-26.08 27.5-45.88 54.32-49.28v57.72zm0-236.11c-30.89-3.91-54.86-29.7-55.81-61.55 19.54 2.17 38.09 6.23 55.81 12.66v48.89z"></path>
                            </svg>
                            <h3 className="text-xl font-semibold">Empower Buyers</h3>
                            <p className="mt-2 text-gray-600">Empowering buyers to save money over their homeownership journey.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 512 512"
                                className="text-4xl mx-auto text-[#f08e80] mb-4"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z"></path>
                            </svg>
                            <h3 className="text-xl font-semibold">Maximize Returns</h3>
                            <p className="mt-2 text-gray-600">Enabling sellers to maximize their returns.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 640 512"
                                className="text-4xl mx-auto text-[#f08e80] mb-4"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M256 336h-.02c0-16.18 1.34-8.73-85.05-181.51-17.65-35.29-68.19-35.36-85.87 0C-2.06 328.75.02 320.33.02 336H0c0 44.18 57.31 80 128 80s128-35.82 128-80zM128 176l72 144H56l72-144zm511.98 160c0-16.18 1.34-8.73-85.05-181.51-17.65-35.29-68.19-35.36-85.87 0-87.12 174.26-85.04 165.84-85.04 181.51H384c0 44.18 57.31 80 128 80s128-35.82 128-80h-.02zM440 320l72-144 72 144H440zm88 128H352V153.25c23.51-10.29 41.16-31.48 46.39-57.25H528c8.84 0 16-7.16 16-16V48c0-8.84-7.16-16-16-16H383.64C369.04 12.68 346.09 0 320 0s-49.04 12.68-63.64 32H112c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h129.61c5.23 25.76 22.87 46.96 46.39 57.25V448H112c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h416c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path>
                            </svg>
                            <h3 className="text-xl font-semibold">Fair &amp; Transparent</h3>
                            <p className="mt-2 text-gray-600">Creating a fair, transparent, and efficient real estate ecosystem.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 512 512"
                                className="text-4xl mx-auto text-[#f08e80] mb-4"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"></path>
                            </svg>
                            <h3 className="text-xl font-semibold">Simplify Process</h3>
                            <p className="mt-2 text-gray-600">Simplifying the entire home buying and selling process.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-black text-2xl md:text-3xl font-semibold text-center">Why Choose Perfecto Home?</h2>
                        <div className="w-[335px] sm:w-[410px] border-b-4 border-[#f08e80] mt-1"></div>
                    </div>
                    <p className="mt-4 text-lg text-center">In today's market, with interest rates
                        above 6.5%, a typical home buyer could end up paying over $1 million in interest
                        to a bank over the life of their mortgage.
                        <br></br>We believe there's a better way.
                    </p>
                    <p className="text-lg text-center">Our innovative platform disrupts the traditional home purchasing market by:</p>
                    <div
                        className="sm:mt-6 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 640 512"
                                className="text-4xl mx-auto text-[#f08e80] mb-4"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M608 32H32C14.33 32 0 46.33 0 64v384c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zM176 327.88V344c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-16.29c-11.29-.58-22.27-4.52-31.37-11.35-3.9-2.93-4.1-8.77-.57-12.14l11.75-11.21c2.77-2.64 6.89-2.76 10.13-.73 3.87 2.42 8.26 3.72 12.82 3.72h28.11c6.5 0 11.8-5.92 11.8-13.19 0-5.95-3.61-11.19-8.77-12.73l-45-13.5c-18.59-5.58-31.58-23.42-31.58-43.39 0-24.52 19.05-44.44 42.67-45.07V152c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8v16.29c11.29.58 22.27 4.51 31.37 11.35 3.9 2.93 4.1 8.77.57 12.14l-11.75 11.21c-2.77 2.64-6.89 2.76-10.13.73-3.87-2.43-8.26-3.72-12.82-3.72h-28.11c-6.5 0-11.8 5.92-11.8 13.19 0 5.95 3.61 11.19 8.77 12.73l45 13.5c18.59 5.58 31.58 23.42 31.58 43.39 0 24.53-19.05 44.44-42.67 45.07zM416 312c0 4.42-3.58 8-8 8H296c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h112c4.42 0 8 3.58 8 8v16zm160 0c0 4.42-3.58 8-8 8h-80c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16zm0-96c0 4.42-3.58 8-8 8H296c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h272c4.42 0 8 3.58 8 8v16z"></path>
                            </svg>
                            <h3 className="text-xl font-semibold">Shift Focus</h3>
                            <p className="mt-2 text-gray-600">Shifting focus away from financial
                                institutions and towards the people who matter most - buyers and sellers.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 352 512"
                                className="text-4xl mx-auto text-[#f08e80] mb-4"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M96.06 454.35c.01 6.29 1.87 12.45 5.36 17.69l17.09 25.69a31.99 31.99 0 0 0 26.64 14.28h61.71a31.99 31.99 0 0 0 26.64-14.28l17.09-25.69a31.989 31.989 0 0 0 5.36-17.69l.04-38.35H96.01l.05 38.35zM0 176c0 44.37 16.45 84.85 43.56 115.78 16.52 18.85 42.36 58.23 52.21 91.45.04.26.07.52.11.78h160.24c.04-.26.07-.51.11-.78 9.85-33.22 35.69-72.6 52.21-91.45C335.55 260.85 352 220.37 352 176 352 78.61 272.91-.3 175.45 0 73.44.31 0 82.97 0 176zm176-80c-44.11 0-80 35.89-80 80 0 8.84-7.16 16-16 16s-16-7.16-16-16c0-61.76 50.24-112 112-112 8.84 0 16 7.16 16 16s-7.16 16-16 16z"></path>
                            </svg>
                            <h3 className="text-xl font-semibold">Creative Financing</h3>
                            <p className="mt-2 text-gray-600">Offering creative financing solutions that bypass traditional banking hurdles.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 640 512"
                                className="text-4xl mx-auto text-[#f08e80] mb-4"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M434.7 64h-85.9c-8 0-15.7 3-21.6 8.4l-98.3 90c-.1.1-.2.3-.3.4-16.6 15.6-16.3 40.5-2.1 56 12.7 13.9 39.4 17.6 56.1 2.7.1-.1.3-.1.4-.2l79.9-73.2c6.5-5.9 16.7-5.5 22.6 1 6 6.5 5.5 16.6-1 22.6l-26.1 23.9L504 313.8c2.9 2.4 5.5 5 7.9 7.7V128l-54.6-54.6c-5.9-6-14.1-9.4-22.6-9.4zM544 128.2v223.9c0 17.7 14.3 32 32 32h64V128.2h-96zm48 223.9c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM0 384h64c17.7 0 32-14.3 32-32V128.2H0V384zm48-63.9c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16c0-8.9 7.2-16 16-16zm435.9 18.6L334.6 217.5l-30 27.5c-29.7 27.1-75.2 24.5-101.7-4.4-26.9-29.4-24.8-74.9 4.4-101.7L289.1 64h-83.8c-8.5 0-16.6 3.4-22.6 9.4L128 128v223.9h18.3l90.5 81.9c27.4 22.3 67.7 18.1 90-9.3l.2-.2 17.9 15.5c15.9 13 39.4 10.5 52.3-5.4l31.4-38.6 5.4 4.4c13.7 11.1 33.9 9.1 45-4.7l9.5-11.7c11.2-13.8 9.1-33.9-4.6-45.1z"></path>
                            </svg>
                            <h3 className="text-xl font-semibold">Transparency</h3>
                            <p className="mt-2 text-gray-600">Providing a transparent, efficient process that benefits both parties.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 640 512"
                                className="text-4xl mx-auto text-[#f08e80] mb-4"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33.02-17.47-32.77-32H16c-8.8 0-16 7.2-16 16v16c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64v-16c0-8.8-7.2-16-16-16zM576 48c0-26.4-21.6-48-48-48H112C85.6 0 64 21.6 64 48v336h512V48zm-64 272H128V64h384v256z"></path>
                            </svg>
                            <h3 className="text-xl font-semibold">Leverage Technology</h3>
                            <p className="mt-2 text-gray-600">Leveraging technology to simplify and streamline real estate transactions.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 md:px-8 lg:px-16 py-10 md:py-12 lg:py-20">
                <h2 className="text-black text-2xl md:text-3xl font-semibold">
                    Recommended For You
                </h2>
                <p className="text-sm md:text-lg text-black">
                    Listings we think you’ll love.
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendedproperties.map((property : {
                        image: any;
                        price: any;
                        address: any;
                        beds: any;
                        baths: any;
                        sqft: any;
                        comingSoon: any;
                        monthlyPayment: any;
                        downPayment: any;
                        terms: any;
                        id: any
                    }, index : React.Key | null | undefined) => (
                        <div key={index}>
                            <Cards {...property}/>
                        </div>
                    ))}
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;
