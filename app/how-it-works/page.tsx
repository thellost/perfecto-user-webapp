'use client'
import React from "react";
import Image from "next/image";
import CarouselCustom, { CarouselCardProps } from "@/components/Carousel/CarouselCustom";
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
import CardSlider from "@/components/Slider/CardSlider";
function About() {

    const loremIpsum : string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore in quis aut a' +
        'tque, sequi consequatur sed odio. Ex atque vitae praesentium culpa';
    const data_placeholder_carousel_small : CarouselCardProps[] = [
        {
            title: "Gate of Olympus",
            bodytext: loremIpsum,
            image_url: "/SlotGo.jpg",
            playing: "258"
        }, {
            title: "Sweet Bonanza",
            bodytext: loremIpsum,
            image_url: "/SweetBonanza.jpg",
            playing: "204"
        }, {
            title: "Sugar Rush",
            bodytext: loremIpsum,
            image_url: "/SugarRush.jpg",
            playing: "322"
        }, {
            title: "Gate of Olympus",
            bodytext: loremIpsum,
            image_url: "/SlotGo.jpg",
            playing: "258"
        }, {
            title: "Sweet Bonanza",
            bodytext: loremIpsum,
            image_url: "/SweetBonanza.jpg",
            playing: "204"
        }, {
            title: "Sugar Rush",
            bodytext: loremIpsum,
            image_url: "/SugarRush.jpg",
            playing: "322"
        }
    ];
    
    return (
        
        <div>
            <CarouselCustom >
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                          <FaBalanceScale className="text-4xl mx-auto text-[#f08e80] mb-4" />
                          <h3 className="text-xl font-semibold">Fair & Transparen3 t</h3>
                          <p className="mt-2 text-gray-600">
                            Creating a fair, transparent, and efficient real estate
                            ecosystem.
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
                          <FaBalanceScale className="text-4xl mx-auto text-[#f08e80] mb-4" />
                          <h3 className="text-xl font-semibold">Fair & Transparent</h3>
                          <p className="mt-2 text-gray-600">
                            Creating a fair, transparent, and efficient real estate
                            ecosystem.
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
                </CarouselCustom>
        </div>
    );
}

export default About;
