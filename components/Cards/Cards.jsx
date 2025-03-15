import React from "react";

const Cards = ({ image, price, address, beds, baths, sqft, comingSoon, monthlyPayment, downPayment, terms  }) => {
  return (
    <div className="relative w-full h-80 overflow-hidden shadow-lg rounded-lg cursor-pointer transform transition-transform hover:scale-105">
      <img
        className="w-full h-full object-cover rounded-t-lg"
        src={image}
        alt="Property"
      />
      {comingSoon && (
        <div className="absolute m-2 top-0 left-0 bg-black text-white text-sm font-bold px-2 py-1 rounded">
          PERFECTO COMING SOON
        </div>
      )}
      <div className="absolute inset-0 bg-black bg-opacity-40 text-white p-4 flex flex-col justify-end rounded-b-lg">
        {/* <div className="text-[20px] font-bold mb-2">${price?.toLocaleString()}</div> */}
        <div className="text-[17px] font-bold mb-2">
          <div>
            Monthly Payment : $
            {monthlyPayment?.toLocaleString() || ""}
          </div>
          <div>
            Down Payment : $
            {downPayment?.toLocaleString() || ""}
          </div>
          <div>Terms : {terms || ""} Years</div>
        </div>
        <div className="text-[17px] font-semibold">{address}</div>
        <div className="flex mt-2 space-x-4 text-sm">
          <span>{beds} Beds</span>
          <span>{baths} Baths</span>
          <span>{sqft} Sq. Ft.</span>
        </div>
      </div>
    </div>
  );
};

export default Cards;
