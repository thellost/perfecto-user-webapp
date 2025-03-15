import React from "react";

function Location({ stroke, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill={fill}
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="lucide lucide-map-pin"
      viewBox="0 0 24 24"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"></path>
      <circle cx="12" cy="10" r="4" fill="#ffffff"></circle>
    </svg>
  );
}

export default Location;
