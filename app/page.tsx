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
            const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/crud/search?address=${searchValue}`);
            const responseData = await response.json();
            const suggestedCities = (cities as SearchList).data
                ?.filter((city : {
                    city: string;
                }) => {
                    const regex = new RegExp(searchValue, "i");
                    return regex.test(city.city);
                }).slice(0, 5);
            console.log(searchValue)
            console.log(responseData)
            console.log(suggestedCities)
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

    const debounce = <T extends unknown[]>( func: (...args: T) => void,delay: number ) => {
        let timer: ReturnType< typeof setTimeout>;
        return (...args: T) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => { func.call(null, ...args) }, delay);
        };
    }
    

    const debouncedFetchSuggestions = debounce(fetchSuggestions, 500);

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
                backgroundRepeat: 'repeat',
                height: '100vh',
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
        </div>
    );
};

export default Home;
