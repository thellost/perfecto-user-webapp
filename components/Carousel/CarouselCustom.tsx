'use client'
import React, {ReactNode} from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {FaBalanceScale} from 'react-icons/fa';

type CarouselProps = {
    title?: string | '',
    bodytext?: string | '',
    bgColor?: string,
    titleColor?: string | '',
    bodytextColor?: string | '',
    data: CarouselCardProps[],
    type?: "BigCard" | "SmallCard",
    infinite?: boolean
}
export type CarouselCardProps = {
    title?: string | '',
    bodytext?: string | '',
    image_url?: string,
    playing?: string
}
interface Props {
    children : ReactNode[] | ReactNode,
    data? : string[]
    // any props that come into the component
}
const CarouselCustom = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    const responsive = {
        desktop: {
            breakpoint: {
                max: 3000,
                min: 1024
            },
            items: 4,
            slidesToSlide: 1, // optional, default to 1.,
            partialVisibilityGutter: 0
        },
        tablet: {
            breakpoint: {
                max: 1024,
                min: 464
            },
            items: 2,
            slidesToSlide: 1, // optional, default to 1.
            partialVisibilityGutter: 40
        },
        mobile: {
            breakpoint: {
                max: 464,
                min: 0
            },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
            partialVisibilityGutter: 0
        }
    };
    return (

        <Carousel swipeable={true} draggable={true} arrows={true} responsive={responsive} ssr={false} // means to render carousel on server-side.
    infinite={true} autoPlaySpeed={1000} keyBoardControl={true} transitionDuration={500} partialVisbile={true}>
            {children}
        </Carousel>

    )
}

export default CarouselCustom