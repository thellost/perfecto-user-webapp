"use client"
import React, {  useState } from "react";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";

import { usePathname, useRouter} from "next/navigation";
import { } from "next/compat/router";
import useSearch from "../UseSearch/useSearch";
import { useAppSelector, useAppDispatch } from "@/app/hook";
import { setUser } from "../../feature/user/userSlice";
import axios from "axios";
import AddressModal from "../Modal/AddressModal";
import { getCookie, deleteCookies } from "../../utils/helper_async";
import Logo from "../../public/images/LogoNobg.png";
import { City } from "@/app/types/DefaultType";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

interface props {
  searchedValue: any,
  setSearch?: (arg0: any) => void,
  onPlaceSelect?: (arg0: any) => void,
  properties?: any,
  setProperties?: (arg0: any) => void,
}


const Navbar = (
  {searchedValue,
  setSearch,
  onPlaceSelect,
  properties,
  setProperties} : props
  
) => {

 const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
          
        },
    })
    const user =  session 
    
  const location = usePathname();
  const isHome = location === '/';
  const navigate = useRouter();


  const isListAddress = location === `/list-address`;
  const isProfile = location === `/profile`;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isValueChanging, setIsValueChanging] = useState(false);

  
  const dispatch = useAppDispatch();
  const { value, setValue, places, buildings, isLoading, updatedProperties } =
    useSearch({ searchedValue, properties });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenMobile, setIsDropdownOpenMobile] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setIsMobileMenuOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //useEffect(()=>{
  //   if(setSearch)setSearch(value)
  // },[value])
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handlePlaceClick = (data: City) => {
    // setValue("");
    
    navigate?.push("/buy");
    if (setSearch) setSearch(value);
    setProperties?.(updatedProperties);
    onPlaceSelect?.(data);
    setIsValueChanging(false);
  };


  const onSearch = (data: any) => {
    setIsValueChanging(false);
    if (setSearch) setSearch(value);
    onPlaceSelect?.(data);
  };

  const handleSearchInputChange = (e: { preventDefault: () => void; target: { value: any; }; }) => {
    e.preventDefault();
    setValue(e.target.value);
    setIsValueChanging(true);
  };

  const handleLogout = async () => {
    /*Remove cookies
    (await Cookies).delete("access_token");
    (await Cookies).delete("token_type");
    */

    signOut();
    // Clear user state

    //dispatch(setUser({ email: "", full_name: "", role: "" }));

    // Navigate to login or homepage
    navigate?.push("/");
  };


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (path: string) => {
    navigate?.push(path);
    setIsDropdownOpen(false);
  };

  return (
    <nav
      className={`bg-transparent p-4 flex justify-between items-center ${
        isHome ? "text-black" : "text-white"
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className="cursor-pointer">
          {isHome || isListAddress || isProfile ? (
            <Link href="/">
            <div
              className={`text-[28px] font-semibold flex items-center cursor-pointer ${
                isListAddress || isProfile ? "text-black" : "text-white"
              }`}
            >
              <div className="flex items-center cursor-pointer">
                <img src={Logo.src} alt="Logo" className="h-16 w-auto mr-2" />
                PERFECTO
              </div>
            </div>
            </Link>
          ) : (
            <div className="flex gap-8">
              <Link href="/">
              <h3
                className="text-[28px] hidden sm:block font-semibold text-black"
              >
                <div className="flex items-center cursor-pointer">
                  <img src={Logo.src} alt="Logo" className="h-16 w-auto mr-2" />
                  PERFECTO
                </div>
              </h3>
              </Link>
              <div className="relative inline-block mt-2 sm:mt-[20px]">
                <input
                  className="p-2 sm:p-2 sm:w-[350px] w-[200px] text-black focus:outline-none border text-[14px]"
                  type="text"
                  placeholder="City, Address"
                  value={value}
                  onChange={handleSearchInputChange}
                />
                <button
                  className="absolute top-1/2 transform -translate-y-1/2 bg-[#f08e80] hover:bg-[#ccc] p-[11px] sm:p-[11px] sm:mt-[-2px]"
                  onClick={onSearch}
                >
                  <FaSearch className="text-white" />
                </button>
                {value && !isLoading && isValueChanging && (
                  <div className="suggestion-box text-black bg-white max-h-[40vh] overflow-y-scroll border border-gray-300 rounded-lg shadow-md p-4 w-full mt-2 absolute top-full z-[1000]">
                    {places.length > 0 && (
                      <div className="mb-4 text-left">
                        <div className="text-gray-800 font-bold mb-2 flex items-center gap-2">
                          <FaSearch />
                          Places
                        </div>
                        {places.map((data, index) => (
                          <div
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-100 transition ease-in-out"
                            onClick={() => handlePlaceClick(data)}
                          >
                            <div className="font-semibold">{data?.city}</div>
                            <div className="text-gray-500">
                              {data?.state_id}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {buildings.length > 0 && (
                      <div className="mb-4 text-left mt-4">
                        <div className="text-gray-800 font-bold mb-2 flex gap-2 items-center">
                          <FaSearch />
                          Buildings
                        </div>
                        {buildings.map((data, index) => (
                           <Link href={`'/property-details/${data.id}'`}>
                          <div
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-100 transition ease-in-out"
                          >
                            <div className="font-semibold">{data.name}</div>
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
          )}
        </div>
      </div>

      <div className="hidden md:flex space-x-4">
        <a
        href="/"
          className={`hover:text-[#f08e80] text-[16px] font-semibold cursor-pointer ${
            isHome
              ? "text-white hover:bg-[white] p-2 rounded-md"
              : "text-black my-auto"
          }`}
        >
          About
        </a>
        <a
        href="/buy"
          className={`hover:text-[#f08e80] text-[16px] font-semibold cursor-pointer ${
            isHome
              ? "text-white hover:bg-[white] p-2 rounded-md"
              : "text-black my-auto"
          }`}
        >
          Buy
        </a>
        <div className="relative">
          <a
            className={`hover:text-[#f08e80] text-[16px] font-semibold cursor-pointer flex items-center ${
              isHome
                ? "text-white hover:bg-[white] p-2 rounded-md"
                : "text-black my-auto"
            }`}
            onClick={toggleDropdown}
          >
            How it works <FaChevronDown className="ml-1" />
          </a>
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 left-0 bg-white text-black shadow-md rounded-md w-40">
              <a
                className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleOptionClick("/how-it-works/seller")}
              >
                For Seller
              </a>
              <a
                className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleOptionClick("/how-it-works/agent")}
              >
                For Agent
              </a>
              <a
                className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleOptionClick("/how-it-works/buyer")}
              >
                For Buyer
              </a>
            </div>
          )}
        </div>
        <a
          href="/wishlist"
          target="_blank"
          className={`hover:text-[#f08e80] text-[16px] font-semibold cursor-pointer ${
            isHome
              ? "text-white hover:bg-[white] p-2 rounded-md"
              : "text-black my-auto"
          }`}
        >
          My Wishlist
        </a>
        {user?.user?.name ? (
          <>
          <Link href="/profile">
            <span
              className={`text-[16px] font-semibold cursor-pointer ${
                isHome ? "text-white p-2" : "text-black my-auto"
              }`}
            >
              Welcome, {user?.user?.name.split(" ")[0]}
            </span>
            </Link>
            <p
              className={`hover:text-[#f08e80] text-[16px] font-semibold cursor-pointer ${
                isHome
                  ? "text-white hover:bg-[white] p-2 rounded-md"
                  : "text-black my-auto"
              }`}
              onClick={handleLogout}
            >
              {" "}
              Logout{" "}
            </p>
          </>
        ) : (
          <>
          <Link href="/login">
            <p
              className={`hover:text-[#f08e80] text-[16px] font-semibold cursor-pointer ${
                isHome
                  ? "text-white hover:bg-[white] p-2 rounded-md"
                  : "text-black my-auto"
              }`}
            >
              {" "}
              Login{" "}
            </p>
            </Link>
            
            <Link href={"/signup"}>
            <p
              className={`hover:text-[#f08e80] text-[16px] font-semibold cursor-pointer ${
                isHome
                  ? "text-white hover:bg-[white] p-2 rounded-md"
                  : "text-black my-auto"
              }`}
            >
              {" "}
              Signup{" "}
            </p>
            </Link>
          </>
        )}
        {(user?.roles === "agent" || user?.roles === "seller") && (
          <p
            className={`hover:text-[#f08e80] text-[16px] font-semibold cursor-pointer ${
              isHome ? "text-white hover:bg-[white] p-2" : "text-black my-auto"
            }`}
            onClick={openModal}
          >
            Submit Address
          </p>
        )}
        {user?.roles === "admin" && (
          <Link href="/list-address">
          <p
            className={`hover:text-[#f08e80] text-[16px] font-semibold cursor-pointer ${
              isHome ? "text-white hover:bg-[white] p-2" : "text-black my-auto"
            }`}
          >
            {" "}
            List Address
          </p>
          </Link>
        )}
      </div>
      <AddressModal isOpen={isModalOpen} closeModal={closeModal} />
      <div className="md:hidden flex items-center mt-[10px]">
        <button
          onClick={toggleMobileMenu}
          className="text-[24px] font-semibold text-[#f08e80] rounded"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 w-3/4 h-full bg-white text-black z-50 transition-transform transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <div className="cursor-pointer">
            <div className="flex items-center cursor-pointer">
              <img src={Logo.src} alt="Logo" className="h-16 w-auto mr-2" />
              <Link href="/">
              <h3
                className="sm:text-[14px] block font-semibold text-black"
              >
                PERFECTO
              </h3>
              </Link>
            </div>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="text-[16px] font-semibold"
          >
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          {user?.user?.name && (
            <Link href="/profile">
            <span
              className={`text-[16px] font-semibold text-black my-auto cursor-pointer`}
            >
              Welcome, {user?.user?.name.split(" ")[0]}
            </span>
            </Link>
          )}
          <a
            href="/about"
            className="block text-black hover:text-[#f08e80] text-[16px] font-semibold cursor-pointer"
          >
            About
          </a>
          <a
            href="/buy"
            className="block text-black hover:text-[#f08e80] text-[16px] font-semibold cursor-pointer"
          >
            Buy
          </a>
          <div className="relative">
            <a
              className="text-[16px] font-semibold cursor-pointer flex items-center"
              onClick={() => setIsDropdownOpenMobile(!isDropdownOpenMobile)}
            >
              How it works <FaChevronDown className="ml-1" />
            </a>
            {isDropdownOpenMobile && (
              <div className="absolute top-full mt-2 left-0 bg-white text-black shadow-md rounded-md w-40">
                <a
                  href="/how-it-works/seller"
                  className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                >
                  For Seller
                </a>
                <a
                href="/how-it-works/agent"
                  className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                >
                  For Agent
                </a>
                <a
                href="/how-it-works/buyer"
                  className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                >
                  For Buyer
                </a>
              </div>
            )}
          </div>
          <a
          href="/wishlist"
            target="_blank"
            className="block text-black hover:text-[#f08e80] text-[16px] font-semibold cursor-pointer"
          >
            My Wishlist
          </a>
          {user?.user?.name ? (
            <p
              className="block text-black hover:text-[#f08e80] text-[16px] font-semibold cursor-pointer"
              onClick={handleLogout}
            >
              {" "}
              Logout{" "}
            </p>
          ) : (
            <>
            <Link href="/login">
              <p
                className="block text-black hover:text-[#f08e80] text-[16px] font-semibold cursor-pointer"
              >
                {" "}
                Login{" "}
              </p>
              </Link>

              <Link href="/signup">
              <p
                className="block text-black hover:text-[#f08e80] text-[16px] font-semibold cursor-pointer"
              >
                {" "}
                Signup{" "}
              </p>
              </Link>
            </>
          )}
          {user?.roles === "agent" && (
            <p
              className="block text-black hover:text-[#f08e80] text-[16px] font-semibold cursor-pointer"
              onClick={openModal}
            >
              {" "}
              Submit Address{" "}
            </p>
          )}
          {user?.roles === "admin" && (
            <Link href="/list-address">
            <p
              className="block text-black hover:text-[#f08e80] text-[16px] font-semibold cursor-pointer"
            >
              {" "}
              List Address
            </p>
            </Link>
          )}
        </div>
      </div>
    </nav>
  
);
};
export default Navbar;
