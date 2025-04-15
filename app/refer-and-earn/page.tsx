'use client'
import React, {useEffect, useState} from "react";
import {
    FaMoneyBillWave,
    FaChartLine,
    FaBalanceScale,
    FaExchangeAlt,
    FaMoneyCheckAlt,
    FaLightbulb,
    FaHandshake,
    FaLaptop,
    FaArrowAltCircleRight
} from "react-icons/fa";
import Navbar from "@/components/Navbar/Navbar";
import Banner from "@/public/images/about.jpeg";
import Banner2 from "@/public/images/hero.jpg";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import {useSession} from "next-auth/react";
import {toast} from "react-toastify";
function referAndEarn() {

    const session = useSession()

    const [loading,
        setLoading] = useState(true);
    const [referral_code,
        setReferralCode] = useState < string | null > (null);

    useEffect(() => {

        if (session
            ?.status === "authenticated") {
            setLoading(false);
            setReferralCode(session
                ?.data
                    ?.referral_code);

        } else if (session
            ?.status === "loading") {
            setLoading(true);
        } else if (session
            ?.status === "unauthenticated") {
            setLoading(false);
        }
    }, [session])
    return (
        <div className="min-h-screen overflow-x-hidden bg-gray-50">

            <div className="w-full z-10 px-4 border-b sticky border-gray-200 bg-white">
                <Navbar
                    searchedValue={undefined}
                    setSearch={undefined}
                    onPlaceSelect={undefined}
                    properties={undefined}
                    setProperties={undefined}/>

            </div>
            {/* CTA Section*/}

            <div className="bg-white h-screen flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Left Section: Images */}
                        <div className="relative grid grid-cols-2 gap-6">
                            <div className="relative -translate-y-20">
                                <img
                                    className="object-cover aspect-31/48  rounded-lg shadow-lg "
                                    src="https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                                    alt="Image 1"/>
                            </div>
                            <div className="relative translate-y-20">
                                <img
                                    className="object-cover aspect-31/48 rounded-lg shadow-lg"
                                    src="https://images.unsplash.com/photo-1671726203638-83742a2721a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                                    alt="Image 2"/>
                            </div>
                        </div>
                        {/* Right Section: Text */}
                        <div>
                            <h4 className=" text-gray-500 font-bold pb-2">PerfectoHome Referral Program</h4>
                            <h2 className="text-2xl text-gray-900 sm:text-4xl text-left">
                                Cheaper mortgages for your friend, and 10% commision for you.
                            </h2>
                            <p className="mt-4 text-lg text-black text-justify">
                                Earn rewards by referring your friends and family to our platform. For every
                                successful referral, they will get cheaper Mortgage and you will receive a 10%
                                commission on their mortgage payments. What's not to love?
                            </p>
                            {loading
                                ? <div role="status">
                                        <svg
                                            aria-hidden="true"
                                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"/>
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"/>
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                :  referral_code ? <div className="mt-4">
                                    <label htmlFor="referralLink" className="block text-gray-700">
                                        Get a link and share it with your friends
                                    </label>
                                    <div className="mt-2 flex rounded-md shadow-sm">
                                        <div className="w-full">

                                            <input
                                                type="text"
                                                id="referralLink"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-bl-lg rounded-tl-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Your Link Here"
                                                value={`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/signup/?referral_code=${referral_code}`}
                                                disabled={true}
                                                required/>
                                        </div>
                                        <button
                                            className="inline-flex cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-primaryOrange hover:bg-primaryOrangeHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryOrange"
                                            onClick={() => {
                                            navigator
                                                .clipboard
                                                .writeText(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/signup/?referral_code=${referral_code}`)
                                                .then(() => {
                                                    toast.success('Referral Link copied to clipboard!');
                                                })
                                                .catch(err => {
                                                    console.error('Failed to copy: ', err);
                                                });
                                        }}>

                                            Copy
                                        </button>

                                    </div>

                                    <div className="mt-4">
                                        By clicking copy you agree to the&nbsp;
                                        <Link href="/" className="text-blue-600">Perfecto Home Referral Term</Link>
                                    </div>
                                </div> : <div className="pt-5">You need to log in to get your referral link.<br></br>
                                    <Link href="/login" className="text-blue-600">Click Here to login</Link> 
                                    </div>
                                    
}

                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
                <div className="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6">
                    <div
                        className="lg:col-span-1 lg:w-full lg:h-full lg:bg-linear-to-r lg:from-gray-50 lg:via-transparent lg:to-transparent dark:from-neutral-800">
                        <div className="sticky top-0 start-0 py-10">
                            <div className=" ">

                                <h1 className="text-xl font-bold">In This Article</h1>
                            </div>
                            <div>
                                <h2>How to Earn Benefits</h2>
                            </div>
                            <div>
                                <h2>
                                    Refer and Earn Eligibility</h2>
                            </div>
                            <div>
                                <h2>
                                    Terms and Conditions</h2>
                            </div>
                            <div>
                                <h2>

                                    Frequently Asked Questions</h2>
                            </div>

                            <div className="space-y-6"></div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="py-10 lg:pe-8">
                            <div className="space-y-5 lg:space-y-8">

                                <h2 className="text-3xl font-bold lg:text-5xl dark:text-white">Refer and Earn Programs</h2>

                                <div className="flex items-center gap-x-5">
                                    <a
                                        className="inline-flex items-center gap-1.5 py-1 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                        href="#">
                                        Company News
                                    </a>
                                    <p className="text-xs sm:text-sm text-gray-800 dark:text-neutral-200">January 18, 2023</p>
                                </div>

                                <p className="text-lg text-justify text-gray-800 dark:text-neutral-200">The
                                    Refer and Earn program gives both new and existing customers access to benefits
                                    when purchasing a qualifying Tesla product. If you have credits from a previous
                                    version of the Refer and Earn program and you currently have a qualifying Tesla
                                    product, you can redeem those credits in the Tesla app up until their expiration
                                    date.
                                </p>

                                <p className="text-lg text-justify text-gray-800 dark:text-neutral-200">We're
                                    proud to be a part of creating a more open culture and to continue building a
                                    product that supports this vision.</p>

                                <div className="text-center">
                                    <div className="grid lg:grid-cols-2 gap-3">
                                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                                            <figure className="relative w-full h-60">
                                                <img
                                                    className="size-full absolute top-0 start-0 object-cover rounded-xl"
                                                    src="https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                                                    alt="Blog Image"></img>
                                            </figure>
                                            <figure className="relative w-full h-60">
                                                <img
                                                    className="size-full absolute top-0 start-0 object-cover rounded-xl"
                                                    src="https://images.unsplash.com/photo-1671726203638-83742a2721a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                                                    alt="Blog Image"></img>
                                            </figure>
                                        </div>
                                        <figure className="relative w-full h-72 sm:h-96 lg:h-full">
                                            <img
                                                className="size-full absolute top-0 start-0 object-cover rounded-xl"
                                                src="https://images.unsplash.com/photo-1671726203394-491c8b574a0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                                                alt="Blog Image"></img>
                                        </figure>
                                    </div>

                                    <span
                                        className="mt-3 block text-sm text-center text-gray-500 dark:text-neutral-500">
                                        Working process
                                    </span>
                                </div>

                                <p className="text-lg text-gray-800 dark:text-neutral-200">As we've grown, we've
                                    seen how Preline has helped companies such as Spotify, Microsoft, Airbnb,
                                    Facebook, and Intercom bring their designers closer together to create amazing
                                    things. We've also learned that when the culture of sharing is brought in
                                    earlier, the better teams adapt and communicate with one another.</p>

                                <p className="text-lg text-gray-800 dark:text-neutral-200">That's why we are excited to share that we now have a
                                    <a
                                        className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
                                        href="#">free version of Preline</a>,
                                    which will allow individual designers, startups and other small teams a chance
                                    to create a culture of openness early on.</p>

                                <blockquote className="text-center p-4 sm:px-7">
                                    <p
                                        className="text-xl font-medium text-gray-800 lg:text-2xl lg:leading-normal xl:text-2xl xl:leading-normal dark:text-neutral-200">
                                        To say that switching to Preline has been life-changing is an understatement. My
                                        business has tripled and I got my life back.
                                    </p>
                                    <p className="mt-5 text-gray-800 dark:text-neutral-200">
                                        Nicole Grazioso
                                    </p>
                                </blockquote>

                                <figure>
                                    <img
                                        className="w-full object-cover rounded-xl"
                                        src="https://images.unsplash.com/photo-1671726203454-488ab18f7eda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                                        alt="Blog Image"></img>
                                    <figcaption
                                        className="mt-3 text-sm text-center text-gray-500 dark:text-neutral-500">
                                        A man and a woman looking at a cell phone.
                                    </figcaption>
                                </figure>

                                <div className="space-y-3">
                                    <h3 className="text-2xl font-semibold dark:text-white">Bringing the culture of sharing to everyone</h3>

                                    <p className="text-lg text-gray-800 dark:text-neutral-200">We know the power of
                                        sharing is real, and we want to create an opportunity for everyone to try
                                        Preline and explore how transformative open communication can be. Now you can
                                        have a team of one or two designers and unlimited spectators (think PMs,
                                        management, marketing, etc.) share work and explore the design process earlier.</p>
                                </div>

                                <ul
                                    className="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-neutral-200">
                                    <li className="ps-2">Preline allows us to collaborate in real time and is a
                                        really great way for leadership on the team to stay up-to-date with what
                                        everybody is working on,"
                                        <a
                                            className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
                                            href="#">said</a>
                                        Stewart Scott-Curran, Intercom's Director of Brand Design.</li>
                                    <li className="ps-2">Preline opened a new way of sharing. It's a persistent way
                                        for everyone to see and absorb each other's work," said David Scott, Creative
                                        Director at
                                        <a
                                            className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
                                            href="#">Eventbrite</a>.</li>
                                </ul>

                                <p className="text-lg text-gray-800 dark:text-neutral-200">Small teams and
                                    individual designers need a space where they can watch the design process
                                    unfold, both for themselves and for the people they work with – no matter if
                                    it's a fellow designer, product manager, developer or client. Preline allows you
                                    to invite more people into the process, creating a central place for
                                    conversation around design. As those teams grow, transparency and collaboration
                                    becomes integrated in how they communicate and work together.</p>

                                <div
                                    className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-y-5 lg:gap-y-0">

                                    <div>
                                        <a
                                            className="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                            href="#">
                                            Plan
                                        </a>
                                        <a
                                            className="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                            href="#">
                                            Web development
                                        </a>
                                        <a
                                            className="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                            href="#">
                                            Free
                                        </a>
                                        <a
                                            className="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                            href="#">
                                            Team
                                        </a>
                                    </div>

                                    <div className="flex justify-end items-center gap-x-1.5">
                                        <div className="hs-tooltip inline-block">
                                            <button
                                                type="button"
                                                className="hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200">
                                                <svg
                                                    className="shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"><path
                                                    d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                                                875
                                                <span
                                                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs dark:bg-black"
                                                    role="tooltip">
                                                    Like
                                                </span>
                                            </button>
                                        </div>
                                        <div
                                            className="block h-3 border-e border-gray-300 mx-3 dark:border-neutral-600"></div>

                                        <div className="hs-tooltip inline-block">
                                            <button
                                                type="button"
                                                className="hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200">
                                                <svg
                                                    className="shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
                                                16
                                                <span
                                                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs dark:bg-black"
                                                    role="tooltip">
                                                    Comment
                                                </span>
                                            </button>
                                        </div>

                                        <div
                                            className="block h-3 border-e border-gray-300 mx-3 dark:border-neutral-600"></div>

                                        <div className="hs-dropdown relative inline-flex">
                                            <button
                                                id="hs-blog-article-share-dropdown"
                                                type="button"
                                                className="hs-dropdown-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                                aria-haspopup="menu"
                                                aria-expanded="false"
                                                aria-label="Dropdown">
                                                <svg
                                                    className="shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
                                                Share
                                            </button>
                                            <div
                                                className="hs-dropdown-menu w-56 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mb-1 z-10 bg-gray-900 shadow-md rounded-xl p-2 dark:bg-black"
                                                role="menu"
                                                aria-orientation="vertical"
                                                aria-labelledby="hs-blog-article-share-dropdown">
                                                <a
                                                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-hidden focus:bg-white/10 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
                                                    href="#">
                                                    <svg
                                                        className="shrink-0 size-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                                    Copy link
                                                </a>
                                                <div className="border-t border-gray-600 my-2 dark:border-neutral-800"></div>
                                                <a
                                                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-hidden focus:bg-white/10 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
                                                    href="#">
                                                    <svg
                                                        className="shrink-0 size-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                                                    </svg>
                                                    Share on Twitter
                                                </a>
                                                <a
                                                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-hidden focus:bg-white/10 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
                                                    href="#">
                                                    <svg
                                                        className="shrink-0 size-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                                    </svg>
                                                    Share on Facebook
                                                </a>
                                                <a
                                                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-hidden focus:bg-white/10 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
                                                    href="#">
                                                    <svg
                                                        className="shrink-0 size-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                                                    </svg>
                                                    Share on LinkedIn
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default referAndEarn;
