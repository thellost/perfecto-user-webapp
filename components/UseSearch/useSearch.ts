'use client'
import { useState, useEffect, useCallback } from "react";
import cities from "../../data-mock/csvjson.json";
import { City, Properties, SearchList } from "@/app/type";

interface props {
  searchedValue: string,
  properties: Properties[]
}

interface buildings {
  _id: string,
  id: string,
  name: string,
  state: string,
}
const useSearch = ({searchedValue, properties}: props) => {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState(searchedValue);
  const [places, setPlaces] = useState<City[]>([]);
  const [buildings, setBuildings] = useState<buildings[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedProperties, setUpdatedProperties] = useState(properties)

  const fetchSuggestions = async (searchValue: string | RegExp) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/search?address=${searchValue}`);
      const responseData = await response.json();

      setUpdatedProperties((prevProperties) => {
        if (JSON.stringify(prevProperties) !== JSON.stringify(responseData)) {
          return responseData;
        }
        return prevProperties;
      });

      const suggestedCities = (cities as SearchList).data?.filter((city) => {
        const regex = new RegExp(searchValue, "i");
        return regex.test(city.city);
      }).slice(0, 5);

      setPlaces(suggestedCities);
      setBuildings(() =>
        responseData.map((res: { _id: string; name: string; state: string; }) => ({
          id: res._id,
          name: res.name,
          state: res.state,
        }))
      );
    } catch (error) {
      console.error("Error performing search:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const debounce = (func: { (searchValue: string | RegExp): Promise<void>; }, delay: number | undefined) => {
    let debounceTimer: string | number | NodeJS.Timeout | undefined;
    return function (...args: any) {
      //this can cause problems
      const context = debounce;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

  useEffect(() => {
    if (value) {
      debouncedFetchSuggestions(value);
    }
  }, [value, debouncedFetchSuggestions]);

  return {
    value,
    setValue,
    suggestions,
    places,
    buildings,
    isLoading,
    setIsLoading,
    updatedProperties
  };
};

export default useSearch;
