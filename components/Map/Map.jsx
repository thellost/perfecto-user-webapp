import React, { useState } from "react";
import GoogleMapReact, { Marker } from "google-map-react";
import LocationIcon from "../../assets/images/location";

function Map({ locations }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const calculateAverageLocation = (locations) => {
    const sumLatitude = locations.reduce(
      (acc, location) => acc + parseFloat(location.latitude),
      0
    );
    const sumLongitude = locations.reduce(
      (acc, location) => acc + parseFloat(location.longitude),
      0
    );

    const averageLatitude = sumLatitude / locations.length;
    const averageLongitude = sumLongitude / locations.length;

    return { lat: averageLatitude, lng: averageLongitude };
  };

  const averageLocation = calculateAverageLocation(locations);

  return (
    <div className="h-[60vh] w-full relative mt-4">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyCSC553l8Isxc4WNFdbiogM-qDCvyMY26c",
        }}
        defaultCenter={averageLocation}
        defaultZoom={14}
      >
        {locations.map((location) => (
          <div
            key={location.propertyID}
            lat={parseFloat(location.latitude)}
            lng={parseFloat(location.longitude)}
            style={{ position: "absolute", transform: "translate(-50%, -50%)" }}
            onClick={() => handleLocationClick(location)}
          >
            <LocationIcon className="h-8 w-8 text-black" />
          </div>
        ))}
      </GoogleMapReact>
      {selectedLocation && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-md cursor-pointer">
          <h3 className="text-xl font-bold mb-2">
            {selectedLocation.propertyName}
          </h3>
        </div>
      )}
    </div>
  );
}

export default Map;
