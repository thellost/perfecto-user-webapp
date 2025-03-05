import React, { useState } from "react";
import {
  FaInstagram,
  FaFacebook,
  FaPinterest,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import newLogo from "../../public/images/LogoNobg.png";

const Footer = () => {
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);

  return (
    <footer className="bg-black text-white py-6 px-4 md:px-20 lg:px-[70px]">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between sm:gap-0 gap-3">
        <div>
          <img
            className="h-[90px] w-auto mb-4"
            src={newLogo.src}
            alt="Perfecto Homes Logo"
          />
        </div>

        <div className="text-sm text-white sm:mt-3">
          <h3 className="text-gray-400 font-bold text-[16px]">Links</h3>
          <div className="flex flex-col space-y-2">
            <a
              href="https://arcmortgage.floify.com/r/perfecto-homes"
              target="_blank"
              className="hover:underline"
            >
              Buyer Application
            </a>
            <a
              href="https://www.azibo.com/rent-payments"
              target="_blank"
              className="hover:underline"
            >
              Existing Owner Payment
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-gray-400 font-bold text-[16px]">Address</h3>
          <ul className="space-y-1 text-start md:text-left">
            <li>Address: 2903 Shattuck Ave, Berkeley, CA, 94705</li>
            <li>Business Hours: 8:00am-8:00pm Monday-Saturday</li>
          </ul>
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-gray-400 font-bold text-[16px]">Contacts</h3>
          <ul className="space-y-1 text-start md:text-left">
            <li>
              Email:{" "}
              <a
                href="mailto: main@perfectohome.com"
                className="hover:underline"
              >
                {" "}
                main@perfectohome.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:510-993-4542" className="hover:underline">
                510-993-4542
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="mt-4 text-center text-sm text-gray-400">
          © 2024 Perfecto Homes. All rights reserved.
        </div>
        <div className="gap-2 items-center flex text-center md:text-left text-gray-400">
          <h3>Socials:</h3>
          <a
            href="https://www.instagram.com/perfectohomescalifornia/?igsh=MzRlODBiNWFlZA%3D%3D"
            target="_blank"
            className="hover:text-blue-400"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
