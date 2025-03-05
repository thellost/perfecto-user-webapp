import { useState, useEffect, useCallback } from "react";
import cities from "../../data-mock/csvjson.json";

const useSearch = ({searchedValue, properties}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState(searchedValue);
  const [places, setPlaces] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedProperties, setUpdatedProperties] = useState(properties)

  const fetchSuggestions = async (searchValue) => {
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

      const suggestedCities = cities.data?.filter((city) => {
        const regex = new RegExp(searchValue, "i");
        return regex.test(city.city);
      }).slice(0, 5);

      setPlaces(suggestedCities);
      setBuildings(() =>
        responseData.map((res) => ({
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

  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      const context = this;
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
