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
    FaClock,
    FaBuilding,
    FaHome,
    FaMoneyBill,
} from "react-icons/fa";
import Navbar from "@/components/Navbar/Navbar";
import Banner from "@/public/images/about.jpeg";
import Banner2 from "@/public/images/hero.jpg";
import Footer from "@/components/Footer/Footer";
import CardSlider from "@/components/Slider/CardSlider";
import CarouselCustom from "@/components/Carousel/CarouselCustom";
function About() {
    return (
        <div className="min-h-screen overflow-x-hidden bg-gray-50">
            <div className="w-full z-10 px-4 border-b border-gray-200 bg-white">
                <Navbar
                    searchedValue={undefined}
                    setSearch={undefined}
                    onPlaceSelect={undefined}
                    properties={undefined}
                    setProperties={undefined}/>
            </div>
            <div className="">
                <section className="">
                    <div
                        className="gap-8 p-10 items-center mx-auto  xl:gap-16 md:grid md:grid-cols-2">

                        <div className="mt-4 md:mt-0">
                            <h2
                                className="text-black text-2xl md:text-3xl font-semibold sm:text-left text-center">Perfecto Homes takes the bank out of the home buying process.</h2>
                            <p className="tracking-tight font-semibold text-lg mt-1 text-[#f08e80]">
                                helping buyers save on costs and sellers maximize returns.
                            </p>
                            <p
                                className="mb-6 mt-1 py-5 font-light text-gray-500 text-justify md:text-lg dark:text-gray-400">Tired
                                of banks eating into your home's value? At Perfecto, we've revolutionized the
                                process. Our innovative approach connects buyers and sellers directly, and
                                reduces decades of interest payments and unnecessary fees. The result? Sellers
                                get above-market prices, while buyers enjoy lower monthly payments. By keeping
                                the cashflow between you, everyone wins - except the banks.</p>
                            <a
                                href="#"
                                className="inline-flex items-center text-white bg-[#f08e80] hover:bg-primary-800 focus:ring-4 focus:ring-amber-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                                Get started
                                <svg
                                    className="ml-2 mr-1 w-5 h-5"
                                    viewBox="0 0 20 20"
                                    fill="white"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </a>
                        </div>
                        <img className="w-full rounded-md" src={Banner.src} alt="dashboard image"></img>
                        <img
                            className="w-full hidden "
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
                            alt="dashboard image"></img>
                    </div>
                </section>
                <div className=" py-[90px] px-4 md:px-20 ">
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-black text-2xl md:text-3xl font-semibold text-center">
                            Why Perfecto ?
                        </h2>
                        <div className="sm:w-[170px] w-[135px] border-b-4 border-[#f08e80]"></div>
                    </div>
                    <p className="mt-4 text-lg text-center pb-10">
                        Selling a home with Perfecto is easy, risk-free and sellers can earn up to
                        double from your home.
                    </p>
                    <div>
                        <CarouselCustom>
                            <div className="bg-white p-6 m-5 rounded-lg shadow-md text-center min-h-10/12">
                                         <FaChartLine className="text-4xl mx-auto text-[#f08e80] mb-4" />
                                         <h3 className="text-xl font-semibold">Open up the buyer market to more buyers</h3>
                                         <p className="mt-2 text-gray-600">
                                           Open up to large and extensive network of agent and buyer
                                         </p>
                                       </div>
                                       <div className="bg-white p-6 m-5 rounded-lg shadow-md text-center min-h-10/12">
                                         <FaMoneyBillWave  className="text-4xl mx-auto text-[#f08e80] mb-4" />
                                         <h3 className="text-xl font-semibold">Get Paid 20% more upfront</h3>
                                         <p className="mt-2 text-gray-600">
                                           Earn more upfront through Perfecto Deals
                                         </p>
                                       </div>
                                       <div className="bg-white p-6 m-5 rounded-lg shadow-md text-center min-h-10/12">
                                         <FaLightbulb className="text-4xl mx-auto text-[#f08e80] mb-4" />
                                         <h3 className="text-xl font-semibold">Avoid Cap Gain Taxes</h3>
                                         <p className="mt-2 text-gray-600">
                                         transfer the option or down payment into a new home to avoid cap gain taxes.
                                         </p>
                                       </div>
                                       <div className="bg-white p-6 m-5 rounded-lg shadow-md text-center min-h-10/12">
                                         <FaMoneyCheckAlt className="text-4xl mx-auto text-[#f08e80] mb-4" />
                                         <h3 className="text-xl font-semibold">5 - 30 Years Monthly Income</h3>
                                         <p className="mt-2 text-gray-600">
                                         receive monthly payments for 5-30 years and a balloon payment prefixed on their terms.
                                         </p>
                                       </div>
                                       <div className="bg-white p-6 m-5 rounded-lg shadow-md text-center min-h-10/12">
                                         <FaHandshake className="text-4xl mx-auto text-[#f08e80] mb-4" />
                                         <h3 className="text-xl font-semibold">Pass Mortgage to Buyers</h3>
                                         <p className="mt-2 text-gray-600">
                                         Sellers have the ability to pass their low-interest rate mortgage to buyers
                                         </p>
                                       </div>
                                       <div className="bg-white p-6 m-5 rounded-lg shadow-md text-center min-h-10/12">
                                         <FaExchangeAlt className="text-4xl mx-auto text-[#f08e80] mb-4" />
                                         <h3 className="text-xl font-semibold">Increase Earning</h3>
                                         <p className="mt-2 text-gray-600">
                                         Sellers have the power to increase earnings by up to 35-216% over the life of their deferred payment agreement.
                                         </p>
                                       </div>
                                       <div className="bg-white p-6 m-5 rounded-lg shadow-md text-center min-h-10/12">
                                         <FaBuilding className="text-4xl mx-auto text-[#f08e80] mb-4" />
                                         <h3 className="text-lg font-semibold">More Earning than Traditional Bank</h3>
                                         <p className="mt-2 text-gray-600">
                                         Sellers earn more money with Perfecto over 20 years than when working with a traditional bank.
                                         </p>
                                       </div>
                                       <div className="bg-white p-6 m-5 rounded-lg shadow-md text-center min-h-10/12">
                                         < FaClock className="text-4xl mx-auto text-[#f08e80] mb-4" />
                                         <h3 className="text-xl font-semibold">Decide Your own Terms</h3>
                                         <p className="mt-2 text-gray-600">
                                         Sellers get to decide their preferred terms in Perfecto 5 - 30 years
                                         </p>
                                       </div>


                        </CarouselCustom>
                    </div>
                </div>
                <div className="bg-white py-[90px]">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base/7 font-semibold text-[#f08e80]">Sell faster</h2>
                            <p
                                className="mt-2 text-4xl font-semibold  text-pretty text-gray-900 sm:text-5xl lg:text-balance">Seller</p>
                            <p className="mt-6 text-lg/8 text-gray-600">Selling a home with Perfecto is easy, risk-free and sellers can earn up to double from your home..</p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-fit">
                            <dl
                                className="grid max-w-xl grid-cols-2 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                                <div className="relative pl-16">
                                    <dt className="text-base/7 font-semibold text-gray-900">
                                        <div
                                            className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-[#f08e80]">
                                            <FaHome className="text-white"></FaHome>
                                        </div>
                                        Sign a Perfecto Homes Lease-to-Own agreement with a buyer
                                    </dt>
                                    <dd className="mt-2 text-base/7 text-gray-600">Morbi viverra dui mi arcu sed.
                                        Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.</dd>
                                </div>
                                <div className="relative pl-16">
                                    <dt className="text-base/7 font-semibold text-gray-900">
                                        <div
                                            className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-[#f08e80]">
                                            <FaMoneyBill className="text-white"></FaMoneyBill>
                                        </div>
                                        Receive any desired down payment on day one
                                    </dt>
                                    <dd className="mt-2 text-base/7 text-gray-600">Sit quis amet rutrum tellus
                                        ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim
                                        lacus amet.</dd>
                                </div>
                                <div className="relative pl-16">
                                    <dt className="text-base/7 font-semibold text-gray-900">
                                        <div
                                            className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-[#f08e80]">
                                            <svg
                                                className="size-6 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                                data-slot="icon">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
                                            </svg>
                                        </div>
                                        The buyer covers your mortgage payment monthly or pays you a guaranteed rent
                                    </dt>
                                    <dd className="mt-2 text-base/7 text-gray-600">Quisque est vel vulputate cursus.
                                        Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.</dd>
                                </div>  
                                <div className="relative pl-16">
                                    <dt className="text-base/7 font-semibold text-gray-900">
                                        <div
                                            className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-[#f08e80]">
                                            <FaChartLine className="text-white"></FaChartLine>
                                        </div>
                                        Sellers earn 208% of their home value using perfecto
                                    </dt>
                                    <dd className="mt-2 text-base/7 text-gray-600">Arcu egestas dolor vel iaculis in
                                        ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec
                                        pharetra eget.</dd>
                                </div>
                                <div className="relative pl-16">
                                    <dt className="text-base/7 font-semibold text-gray-900">
                                        <div
                                            className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-[#f08e80]">
                                            <FaExchangeAlt className="text-white"></FaExchangeAlt>
                                        </div>
                                        When the lease is up, the agreement is executed and the title is transferred to
                                        the buyer
                                    </dt>
                                    <dd className="mt-2 text-base/7 text-gray-600">Arcu egestas dolor vel iaculis in
                                        ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec
                                        pharetra eget.</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                <div className="py-[90px]">
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-black text-2xl md:text-3xl font-semibold text-center">
                            Join Us
                        </h2>
                        <div className="w-[105px] sm:w-[105px] border-b-4 border-[#f08e80] mt-1"></div>
                    </div>
                    <div>
                        <p className="mt-4 text-lg text-center">
                            Whether you're looking to buy your dream home or sell your property for maximum
                            value, Perfecto Home is here to help you win in real estate.
                            <br/>
                            Experience the future of property transactions today
                        </p>
                    </div>
                    <div className="flex gap-2 items-center justify-center mt-6">
                        <div>
                            <a className="text-[20px] font-semibold text-[#f08e80]" href="/signup">
                                Sign up
                            </a>
                        </div>
                        <div>
                            <FaArrowAltCircleRight color="#f08e80"/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default About;
