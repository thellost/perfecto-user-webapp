import React, { ReactNode } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Carousel from "react-multi-carousel";
interface Props {
    children: ReactNode[] | ReactNode,
    data: string[]
    // any props that come into the component
}
function CardSlider({children, data}:Props) {

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
          slidesToSlide: 1,// optional, default to 1.,
          partialVisibilityGutter: 20
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
          slidesToSlide: 3, // optional, default to 1.
          partialVisibilityGutter: 40
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 2, // optional, default to 1.
          partialVisibilityGutter: 0
        }
      };
      
      
      const renderCards = () => {
        return data.map(data => {
          return(
                     <div className=" bg-baseColor rounded-xl max-w-96 overflow-hidden shadow-lg">
                      <img
                          className="object-fill h-80 w-96"
                          src="/images/hero.jpg"
                          alt="Sunset in the mountains"
                          width={1000}
                          height={1000}></img>
                      <div className="px-6 py-4">
                          <div className="text-white font-bold text-xl mb-2">title</div>
                          <p className="text-gray-300 text-base">
                              title
                          </p>
                      </div>
                      <div className="px-6 pt-4 pb-2 span">
                          <span className="inline-block mr-2 mb-2">
                            <a href="/about">
                              <button
                                  type='button'
                                  className='py-2.5 px-6 text-sm rounded-lg bg-transparent border border-white text-white cursor-pointer font-bold text-center shadow-xs transition-all duration-500 hover:border-orangeAttention hover:bg-orangeAttention hover:text-black'>Play Now</button>
                            </a>
                          </span>
                          <span
                              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Hot</span>
                          <span
                              className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-orangeAttention mr-2 mb-2 animate-pulse">• 
                              Playing</span>
                      </div>
                  </div>)
        });
      };
  return (  
    <div className={`bg-white row-auto h-auto overflow-visible pb-20 pl-10 pr-10 pt-20 z-0 md:pl-20 md:pr-10`}>
          <h2 className={`mb-4 text-2xl text-inter font-extrabold tracking-tight leading-none text-black md:text-3xl lg:text-4xl dark:text-dark}`}>dark</h2>
          <p className={`mb-8 text-lg font-normal text-black lg:text-xl dark:text-white`}>aaa</p>
            <Carousel
            swipeable={true}
            draggable={true}
            arrows={true}
            responsive={responsive}
            ssr={false} // means to render carousel on server-side.
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            transitionDuration={500}
            partialVisbile={true}
            >
            {renderCards()}
            </Carousel>
            
            </div>
  );
}

export default CardSlider;
