
'use client'
import React from "react";
import {
  FaMoneyBillWave,
  FaChartLine,
  FaBalanceScale,
  FaExchangeAlt,
  FaMoneyCheckAlt,
  FaLightbulb,
  FaHandshake,
  FaLaptop,
  FaArrowAltCircleRight,
} from "react-icons/fa";
import Navbar from "@/components/Navbar/Navbar";
import Banner from "@/public/images/about.jpeg";
import Banner2 from "@/public/images/hero.jpg";
import Footer from "@/components/Footer/Footer";
function About() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <div className="w-full z-10 px-4 border-b bg-white">
        <Navbar searchedValue={undefined} setSearch={undefined} onPlaceSelect={undefined} properties={undefined} setProperties={undefined} />
      </div>
      <div className="px-4 md:px-20 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <div>
            <div className="sm:block flex flex-col items-center justify-center">
              <h2 className="text-black text-2xl md:text-3xl font-semibold sm:text-left text-center">
                About Perfecto Homes
              </h2>
              <div className="sm:w-[308px] w-[260px] border-b-4 border-[#f08e80] mt-1"></div>
            </div>
            <p className="mt-4 text-lg text-justify leading-relaxed ">
              Perfecto Home is revolutionizing the real estate industry by
              putting buyers and sellers first. For hundreds of years, banks
              have been at the center of the home buying experience, leaving the
              upside of home ownership split between buyers, sellers, banks and
              realtors. We believe that it's time to simplify the homeownership
              process, and that’s why we’ve created Perfecto Home. Our
              innovative solution that's reshaping property transactions, making
              homeownership more accessible and advantageous for buyers, sellers
              and realtors.
            </p>
          </div>
          <div>
            <img
              className="object-cover w-full h-full rounded-lg"
              src={Banner.src}
              alt="About Banner"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-10">
          <div>
            <img
              className="object-cover w-full h-full rounded-lg"
              src={Banner2.src}
              alt="Our Story Banner"
            />
          </div>
          <div>
            <div className="sm:block flex flex-col items-center justify-center">
              <h2 className="text-black text-2xl md:text-3xl font-semibold">
                Our Story
              </h2>
              <div className="sm:w-[126px] w-[110px] border-b-4 border-[#f08e80] mt-1"></div>
            </div>
            <p className="mt-4 text-lg text-justify leading-relaxed">
              Born from a realization that the traditional home buying process
              is fundamentally broken, Perfecto Home was founded by a team of
              real estate, tech and investment professionals on a mission to
              change the status quo in real estate. Over the last 10 years, our
              team has watched as traditional home ownership has continued to
              break down. With home prices on a steady rise and the
              rapid—unprecedented—spike of interest rates in 2022, the pains of
              homeownership have only intensified, resulting in entire
              generations questioning if they will achieve the dream of home
              ownership. Today we find ourselves at an inflection point in the
              global real estate industry: homeowners can’t afford to sell their
              homes and leave their locked-in rates, buyers can’t buy due to the
              cost of capital, and realtors can’t do anything but wait on the
              sidelines. We at Perfecto Home believe in a new way, and we’re
              here to change the real estate landscape forever.
            </p>
          </div>
        </div>
        <div className="py-[90px]">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-black text-2xl md:text-3xl font-semibold text-center">
              Our Mission
            </h2>
            <div className="sm:w-[170px] w-[135px] border-b-4 border-[#f08e80]"></div>
          </div>
          <p className="mt-4 text-lg text-center">
            We're on a mission to transform the real estate industry by:
          </p>
          <div className="sm:mt-6 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaMoneyBillWave className="text-4xl mx-auto text-[#f08e80] mb-4" />
              <h3 className="text-xl font-semibold">Empower Buyers</h3>
              <p className="mt-2 text-gray-600">
                Empowering buyers to save money over their homeownership
                journey.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaChartLine className="text-4xl mx-auto text-[#f08e80] mb-4" />
              <h3 className="text-xl font-semibold">Maximize Returns</h3>
              <p className="mt-2 text-gray-600">
                Enabling sellers to maximize their returns.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaBalanceScale className="text-4xl mx-auto text-[#f08e80] mb-4" />
              <h3 className="text-xl font-semibold">Fair & Transparent</h3>
              <p className="mt-2 text-gray-600">
                Creating a fair, transparent, and efficient real estate
                ecosystem.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaExchangeAlt className="text-4xl mx-auto text-[#f08e80] mb-4" />
              <h3 className="text-xl font-semibold">Simplify Process</h3>
              <p className="mt-2 text-gray-600">
                Simplifying the entire home buying and selling process.
              </p>
            </div>
          </div>
        </div>
        <div className="pb-[90px]">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-black text-2xl md:text-3xl font-semibold text-center">
              Why Choose Perfecto Home?
            </h2>
            <div className="w-[335px] sm:w-[410px] border-b-4 border-[#f08e80] mt-1"></div>
          </div>
          <p className="mt-4 text-lg text-center">
            In today's market, with interest rates above 6.5%, a typical home
            buyer could end up paying over $1 million in interest to a bank over
            the life of their mortgage. <br />
            We believe there's a better way.
          </p>
          <p className="text-lg text-center">
            Our innovative platform disrupts the traditional home purchasing
            market by:
          </p>
          <div className="sm:mt-6 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaMoneyCheckAlt className="text-4xl mx-auto text-[#f08e80] mb-4" />
              <h3 className="text-xl font-semibold">Shift Focus</h3>
              <p className="mt-2 text-gray-600">
                Shifting focus away from financial institutions and towards the
                people who matter most - buyers and sellers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaLightbulb className="text-4xl mx-auto text-[#f08e80] mb-4" />
              <h3 className="text-xl font-semibold">Creative Financing</h3>
              <p className="mt-2 text-gray-600">
                Offering creative financing solutions that bypass traditional
                banking hurdles.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaHandshake className="text-4xl mx-auto text-[#f08e80] mb-4" />
              <h3 className="text-xl font-semibold">Transparency</h3>
              <p className="mt-2 text-gray-600">
                Providing a transparent, efficient process that benefits both
                parties.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaLaptop className="text-4xl mx-auto text-[#f08e80] mb-4" />
              <h3 className="text-xl font-semibold">Leverage Technology</h3>
              <p className="mt-2 text-gray-600">
                Leveraging technology to simplify and streamline real estate
                transactions.
              </p>
            </div>
          </div>
        </div>
        <div className="pb-[90px]">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-black text-2xl md:text-3xl font-semibold text-center">
              Join Us
            </h2>
            <div className="w-[105px] sm:w-[105px] border-b-4 border-[#f08e80] mt-1"></div>
          </div>
          <div>
            <p className="mt-4 text-lg text-center">
              Whether you're looking to buy your dream home or sell your
              property for maximum value, Perfecto Home is here to help you win
              in real estate. <br /> Experience the future of property
              transactions today
            </p>
          </div>
          <div className="flex gap-2 items-center justify-center mt-6">
            <div>
              <a
                className="text-[20px] font-semibold text-[#f08e80]"
                href="/signup"
              >
                Sign up
              </a>
            </div>
            <div>
              <FaArrowAltCircleRight color="#f08e80" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
