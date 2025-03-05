import React from 'react'

const Search = ({setSearch}) => {
    return (
        <form className="max-w-3xl mx-auto w-full ">
            <div className="relative">
                <input type="search" onChange={(e)=>setSearch(e.target.value)} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="City/Address" required />
            </div>
        </form>
    )
}

export default Search
