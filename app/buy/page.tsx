'use client'
import React, {useEffect, useState, useCallback} from "react";
import Navbar from "@/components/Navbar/Navbar";
import Cards from "@/components/Cards/Cards";
import ClusterMap from "@/components/ClusterMap/ClusterMap";
import Filters from "@/components/Filters/Filters";
import {useRouter} from "next/compat/router";
import axios from "axios";
import cities from "@/data-mock/csvjson.json";
import Footer from "@/components/Footer/Footer";
import {City, Properties, SearchList} from "../types/DefaultType";

const BuyPage = () => {
    const location = useRouter()
    const property = location
        ?.query
    const [properties,
        setProperties] = useState < Properties[] > ([]);
    const [filteredProperties,
        setFilteredProperties] = useState < Properties[] > ([]);
    const [search,
        setSearch] = useState(property
        ?.city);
    const [maxPrice,
        setMaxPrice] = useState();
    const [minPrice,
        setMinPrice] = useState();
    const [lng,
        setLng] = useState(-71.057083);
    const [lat,
        setLat] = useState(42.361145);

    const navigate = useRouter();


    const handlePlaceSelect = (data : {
        lat: React.SetStateAction < number >;
        lng: React.SetStateAction < number >;
    }) => {
        setLat(data.lat);
        setLng(data.lng);
        handleSubmitClick();
    };

    const handleSubmitClick = useCallback(async(minPrice?: number, maxPrice?: number, minBath?: number, maxBath?: number, minBeds?: number, maxBeds?: number, minSqft?: number, maxSqft?: number, minLot?: number, maxLot?: number, minYearBuilt?: number, maxYearBuilt?: number, statuses?: string[]) => {
        const buildParams = (params : {
            [x : string]: any;
            address?: any;
            city?: any;
            minPrice?: number | undefined;
            maxPrice?: number | undefined;
            minBaths?: number | undefined;
            maxBaths?: number | undefined;
            minBeds?: number | undefined;
            maxBeds?: number | undefined;
            minSqft?: number | undefined;
            maxSqft?: number | undefined;
            minLotSize?: number | undefined;
            maxLotSize?: number | undefined;
            minYearBuilt?: number | undefined;
            maxYearBuilt?: number | undefined;
        }) => {
            let result : Record < string,
                any > = {};
            for (const key in params) {
                if (params[key] !== null && params[key] !== undefined && params[key] !== "") {
                    result[key] = params[key];
                }
            }
            return result;
        };

        const params = buildParams({
            address: search,
            city: search,
            minPrice,
            maxPrice,
            minBaths: minBath,
            maxBaths: maxBath,
            minBeds,
            maxBeds,
            minSqft,
            maxSqft,
            minLotSize: minLot,
            maxLotSize: maxLot,
            minYearBuilt,
            maxYearBuilt
        });

        const queryString = Object
            .keys(params)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key as keyof typeof params])}`)
            .join("&");

        const statusQueryString = statuses && statuses.length > 0
            ? statuses.map((status : string | number | boolean) => `status=${encodeURIComponent(status)}`).join("&")
            : "";

        const finalQueryString = [queryString, statusQueryString]
            .filter(Boolean)
            .join("&");

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/crud/property`);
            const data = response.data;
            setProperties((prevProperties) => {
                if (prevProperties !== data) {
                    return data;
                }
                return prevProperties;
            });
            setFilteredProperties((prevProperties) => {

                if (prevProperties !== data) {
                    return data;
                }
                return prevProperties;
            })
            if (search && search.length > 0) {
                const suggestedCities = (cities as SearchList).data
                    ?.filter((city) => {
                        const regex = new RegExp((search as unknown as RegExp), "i");
                        return regex.test(city.city);
                    });
                setLat(suggestedCities[0].lat || 42.361145);
                setLng(suggestedCities[0].lng || -71.057083);
            } else {
                setLat((property
                    ?.lat as unknown as number));
                setLng((property
                    ?.lng as unknown as number));
            }
        } catch (error) {
            console.log(error);
        }
    }, [
        search, property
            ?.lat,
        property
            ?.lng
    ]);

    useEffect(() => {
        handleSubmitClick();
    }, [handleSubmitClick]);

    useEffect(() => {
        if (minPrice !== undefined || maxPrice !== undefined) {
            handleSubmitClick(minPrice, maxPrice);
        }
    }, [minPrice, maxPrice, handleSubmitClick]);

    const handleBoundsChanged = async(bounds : {
        minLat: number;
        maxLat: number;
        minLng: number;
        maxLng: number;
    }) => {
        const params = {
            minLat: bounds.minLat,
            maxLat: bounds.maxLat,
            minLng: bounds.minLng,
            maxLng: bounds.maxLng,
            minPrice: 0,
            maxPrice: 9999999
        };

        if (minPrice !== undefined) 
            params.minPrice = minPrice;
        if (maxPrice !== undefined) 
            params.maxPrice = maxPrice;
        
        const queryString = Object
            .keys(params)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key as keyof typeof params])}`)
            .join("&");


        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/crud/property`);
            const data = response.data;
            setFilteredProperties(data);

        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    return (
        <div className="min-h-screen overflow-x-hidden">
            <div className="w-full z-10 px-4 border-b border-gray-200 bg-white">
                <Navbar
                    searchedValue={search}
                    setSearch={setSearch}
                    onPlaceSelect={handlePlaceSelect}
                    properties={properties}
                    setProperties={setProperties}/>
            </div>
            <div
                className="grid sm:grid-cols-2 grid-cols-1 sm:pr-[90px] pr-[24px] gap-[24px] sm:h-auto">
                <div>
                    <ClusterMap
                        properties={filteredProperties}
                        onBoundsChanged={handleBoundsChanged}/>
                </div>
                <div>
                    <div className="">
                        <h2 className="text-[24px] font-medium py-3">
                            Explore This Neighborhood
                        </h2>
                        <Filters
                            onSubmit={handleSubmitClick}
                            setMaxPrice={setMaxPrice}
                            setMinPrice={setMinPrice}/>
                    </div>
                    <div className="flex-1 overflow-y-auto h-[calc(100vh-150px)]">
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sticky overflow-y-auto">
                            {(filteredProperties as Properties[])?.map((property, index) => (
                                <a href={"/property-details/"+property.id}>
                                    <div  key={index}>
                                        <Cards
                                            image={property.image}
                                            price={0}
                                            address={property.address}
                                            beds={property.beds}
                                            baths={property.baths}
                                            sqft={property.sqft}
                                            comingSoon={property.comingSoon}
                                            monthlyPayment={property.monthlyPayment}
                                            downPayment={property.downPayment}
                                            terms={property.terms}
                                            key={index}
                                        />
                                    </div>
                                    </a>
                                ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyPage;
