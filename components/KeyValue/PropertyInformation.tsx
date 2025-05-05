"use client";

import { useState, useEffect } from "react";
type keyValuePair = {
  key: string;
  parents: {
    key: string;
    pairs: { key: string; value: string }[];
  }[];
}[];

const KeyValueForm = ({
  title = "Property Information",
  grandParentSuggestion = ["Category", "Type", "Group"],
  parentSuggestion = ["Feature", "HOA", "Location", "Amenities"],
  childSuggestion = ["name", "email", "phone", "address", "city"],
  defaultValue = [
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
  ],
}: {
  title?: string;
  grandParentSuggestion?: string[];
  parentSuggestion?: string[];
  childSuggestion?: string[];
  defaultValue?: keyValuePair;
}) => {
  const [nestedKeyValuePairs, setNestedKeyValuePairs] = useState<keyValuePair>(defaultValue);

  const [showGrandParentSuggestions, setShowGrandParentSuggestions] = useState<boolean[]>(
    defaultValue.map(() => false)
  );
  const [showParentSuggestions, setShowParentSuggestions] = useState<boolean[][]>(
    defaultValue.map((grandParent) =>
      grandParent.parents.map(() => false)
    )
  );
  const [showChildSuggestions, setShowChildSuggestions] = useState<boolean[][][]>(
    defaultValue.map((grandParent) =>
      grandParent.parents.map((parent) =>
        parent.pairs.map(() => false)
      )
    )
  );

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowGrandParentSuggestions(showGrandParentSuggestions.map(() => false));
      setShowParentSuggestions(showParentSuggestions.map((parent) => parent.map(() => false)));
      setShowChildSuggestions(showChildSuggestions.map((child) => child.map((pair) => pair.map(() => false))));
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showGrandParentSuggestions, showParentSuggestions, showChildSuggestions]);

  const handleAddGrandParent = () => {
    setNestedKeyValuePairs([
      ...nestedKeyValuePairs,
      { key: "", parents: [{ key: "", pairs: [{ key: "", value: "" }] }] },
    ]);
    setShowGrandParentSuggestions([...showGrandParentSuggestions, false]);
    setShowParentSuggestions([...showParentSuggestions, [false]]);
    setShowChildSuggestions([...showChildSuggestions, [[false]]]);
  };

  const handleAddParent = (grandParentIndex: number) => {
    const updatedPairs = [...nestedKeyValuePairs];
    updatedPairs[grandParentIndex].parents.push({ key: "", pairs: [{ key: "", value: "" }] });
    setNestedKeyValuePairs(updatedPairs);

    const updatedParentVisibility = [...showParentSuggestions];
    updatedParentVisibility[grandParentIndex].push(false);
    setShowParentSuggestions(updatedParentVisibility);

    const updatedChildVisibility = [...showChildSuggestions];
    updatedChildVisibility[grandParentIndex].push([false]);
    setShowChildSuggestions(updatedChildVisibility);
  };

  const handleAddChild = (grandParentIndex: number, parentIndex: number) => {
    const updatedPairs = [...nestedKeyValuePairs];
    updatedPairs[grandParentIndex].parents[parentIndex].pairs.push({ key: "", value: "" });
    setNestedKeyValuePairs(updatedPairs);

    const updatedVisibility = [...showChildSuggestions];
    updatedVisibility[grandParentIndex][parentIndex].push(false);
    setShowChildSuggestions(updatedVisibility);
  };

  const handleDeleteGrandParent = (grandParentIndex: number) => {
    const updatedPairs = nestedKeyValuePairs.filter((_, index) => index !== grandParentIndex);
    setNestedKeyValuePairs(updatedPairs);

    const updatedGrandParentVisibility = showGrandParentSuggestions.filter((_, index) => index !== grandParentIndex);
    setShowGrandParentSuggestions(updatedGrandParentVisibility);

    const updatedParentVisibility = showParentSuggestions.filter((_, index) => index !== grandParentIndex);
    setShowParentSuggestions(updatedParentVisibility);

    const updatedChildVisibility = showChildSuggestions.filter((_, index) => index !== grandParentIndex);
    setShowChildSuggestions(updatedChildVisibility);
  };

  const handleDeleteParent = (grandParentIndex: number, parentIndex: number) => {
    const updatedPairs = [...nestedKeyValuePairs];
    updatedPairs[grandParentIndex].parents = updatedPairs[grandParentIndex].parents.filter(
      (_, index) => index !== parentIndex
    );
    setNestedKeyValuePairs(updatedPairs);

    const updatedParentVisibility = [...showParentSuggestions];
    updatedParentVisibility[grandParentIndex] = updatedParentVisibility[grandParentIndex].filter(
      (_, index) => index !== parentIndex
    );
    setShowParentSuggestions(updatedParentVisibility);

    const updatedChildVisibility = [...showChildSuggestions];
    updatedChildVisibility[grandParentIndex] = updatedChildVisibility[grandParentIndex].filter(
      (_, index) => index !== parentIndex
    );
    setShowChildSuggestions(updatedChildVisibility);
  };

  const handleDeleteChild = (grandParentIndex: number, parentIndex: number, childIndex: number) => {
    const updatedPairs = [...nestedKeyValuePairs];
    updatedPairs[grandParentIndex].parents[parentIndex].pairs = updatedPairs[grandParentIndex].parents[
      parentIndex
    ].pairs.filter((_, index) => index !== childIndex);
    setNestedKeyValuePairs(updatedPairs);

    const updatedChildVisibility = [...showChildSuggestions];
    updatedChildVisibility[grandParentIndex][parentIndex] = updatedChildVisibility[grandParentIndex][
      parentIndex
    ].filter((_, index) => index !== childIndex);
    setShowChildSuggestions(updatedChildVisibility);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Nested Key-Value Pairs:", nestedKeyValuePairs);
    alert("Nested Key-Value Pairs Submitted!");
  };
  console.log("Nested Key-Value Pairs:", nestedKeyValuePairs);
  console.log("showGrandParentSuggestions:", showGrandParentSuggestions);
  console.log("showParentSuggestions:", showParentSuggestions);
  
  return (
    <div className=" p-6 rounded w-full">
      <h1 className="text-xl font-bold mb-4">{title}</h1>
      {nestedKeyValuePairs.map((grandParentPair, grandParentIndex) => (
      <div key={grandParentIndex} className="mb-6 border border-gray-300 rounded-lg p-4 bg-gray-50">
      <div className="relative flex items-center mb-4 space-x-4">
        <div className="relative w-full">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">Section Name</label>

          <div className="flex space-x-2">
            
          <button 
            type="button" 
            onClick={() => handleAddParent(grandParentIndex)}  
            className="rounded-md cursor-pointer inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button 
            type="button" 
            onClick={() => handleDeleteGrandParent(grandParentIndex)}  
            className="rounded-md cursor-pointer inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          </div>
        </div>
        
        <input
        type="text"
        placeholder="Section Name"
        value={grandParentPair.key}
        onChange={(e) => {
        const updatedPairs = [...nestedKeyValuePairs];
        updatedPairs[grandParentIndex].key = e.target.value;
        setNestedKeyValuePairs(updatedPairs);

        const updatedVisibility = [...showGrandParentSuggestions];
        updatedVisibility[grandParentIndex] = true;
        setShowGrandParentSuggestions(updatedVisibility);
        }}
        onFocus={() => {
        const updatedVisibility = [...showGrandParentSuggestions];
        updatedVisibility[grandParentIndex] = true;
        setShowGrandParentSuggestions(updatedVisibility);
        }}
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        required
        />
        {showGrandParentSuggestions[grandParentIndex] && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded shadow-md mt-1 w-full">
        {grandParentSuggestion.map((suggestion, index) => (
          <li
          key={index}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
        const updatedPairs = [...nestedKeyValuePairs];
        updatedPairs[grandParentIndex].key = suggestion;
        setNestedKeyValuePairs(updatedPairs);

        const updatedVisibility = [...showGrandParentSuggestions];
        updatedVisibility[grandParentIndex] = false;
        setShowGrandParentSuggestions(updatedVisibility);
          }}
          >
          {suggestion}
          </li>
        ))}
        </ul>
        )}
        </div>
       
      </div>
      {grandParentPair.parents.map((parentPair, parentIndex) => (
        <div key={parentIndex} className="mb-6 ml-4">
        <div className="relative flex items-center mb-4 space-x-4">
        <div className="relative w-full">
        <input
          type="text"
          placeholder="Detail Information"
          value={parentPair.key}
          onChange={(e) => {
          const updatedPairs = [...nestedKeyValuePairs];
          updatedPairs[grandParentIndex].parents[parentIndex].key = e.target.value;
          setNestedKeyValuePairs(updatedPairs);

          const updatedVisibility = [...showParentSuggestions];
          updatedVisibility[grandParentIndex][parentIndex] = true;
          setShowParentSuggestions(updatedVisibility);
          }}
          onFocus={() => {
          const updatedVisibility = [...showParentSuggestions];
          updatedVisibility[grandParentIndex][parentIndex] = true;
          setShowParentSuggestions(updatedVisibility);
          }}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          required
        />
        {showParentSuggestions[grandParentIndex][parentIndex] && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded shadow-md mt-1 w-full">
          {parentSuggestion.map((suggestion, index) => (
        <li
        key={index}
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => {
        const updatedPairs = [...nestedKeyValuePairs];
        updatedPairs[grandParentIndex].parents[parentIndex].key = suggestion;
        setNestedKeyValuePairs(updatedPairs);

        const updatedVisibility = [...showParentSuggestions];
        updatedVisibility[grandParentIndex][parentIndex] = false;
        setShowParentSuggestions(updatedVisibility);
        }}
        >
        {suggestion}
        </li>
          ))}
          </ul>
        )}
        </div>
        <div className="flex justify-between items-center mb-2">
          
          <button 
            type="button" 
            onClick={() => handleAddChild(grandParentIndex, parentIndex)}  
            className="rounded-md cursor-pointer inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
          
        <button 
            type="button" 
            onClick={() => handleDeleteParent(grandParentIndex, parentIndex)}  
            className="rounded-md cursor-pointer inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
         
        </div>
        {parentPair.pairs.map((childPair, childIndex) => (
        <div key={childIndex} className="flex items-center mb-4 space-x-4 ml-8">
        <div className="relative w-1/2">
          <input
          type="text"
          placeholder="Title"
          value={childPair.key}
          onChange={(e) => {
        const updatedPairs = [...nestedKeyValuePairs];
        updatedPairs[grandParentIndex].parents[parentIndex].pairs[childIndex].key =
        e.target.value;
        setNestedKeyValuePairs(updatedPairs);

        const updatedVisibility = [...showChildSuggestions];
        updatedVisibility[grandParentIndex][parentIndex][childIndex] = true;
        setShowChildSuggestions(updatedVisibility);
          }}
          onFocus={() => {
        const updatedVisibility = [...showChildSuggestions];
        updatedVisibility[grandParentIndex][parentIndex][childIndex] = true;
        setShowChildSuggestions(updatedVisibility);
          }}
         className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          required
          />
          {showChildSuggestions[grandParentIndex][parentIndex][childIndex] && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded shadow-md mt-1 w-full">
        {childSuggestion.map((suggestion, index) => (
        <li
        key={index}
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => {
        const updatedPairs = [...nestedKeyValuePairs];
        updatedPairs[grandParentIndex].parents[parentIndex].pairs[childIndex].key = suggestion;
        setNestedKeyValuePairs(updatedPairs);

        const updatedVisibility = [...showChildSuggestions];
        updatedVisibility[grandParentIndex][parentIndex][childIndex] = false;
        setShowChildSuggestions(updatedVisibility);
        }}
        >
        {suggestion}
        </li>
        ))}
          </ul>
          )}
        </div>
        <input
          type="text"
          placeholder=""
          value={childPair.value}
          onChange={(e) => {
          const updatedPairs = [...nestedKeyValuePairs];
          updatedPairs[grandParentIndex].parents[parentIndex].pairs[childIndex].value =
        e.target.value;
          setNestedKeyValuePairs(updatedPairs);
          }}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          required
        />
        <button 
            type="button" 
            onClick={() => handleDeleteChild(grandParentIndex, parentIndex, childIndex)}  
            className="rounded-md cursor-pointer inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
         
       
        </div>
        ))}
        </div>
      ))}
      </div>
      ))}
       <button
        type="button"
        onClick={handleAddGrandParent}
        className="bg-blue-500 w-full my-5 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
        Add Section
        </button>
    </div>
  );
};

export default KeyValueForm;