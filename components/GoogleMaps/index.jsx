import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "70vh",
};

const customMarkerIcon = (color) => ({
  path: `M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z`,
  fillColor: color,
  fillOpacity: 1,
  strokeWeight: 0,
  scale: 1.5,
  labelOrigin: new window.google.maps.Point(12, 15),
});

function GoogleMaps({
  locations,
  highlightedLocation,
  isDetail = false,
  initialCenter,
}) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCSC553l8Isxc4WNFdbiogM-qDCvyMY26c",
  });

  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef(null);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const handleCardClick = (propertyID) => {
    navigate(`/property-details/${propertyID}`);
  };

  useEffect(() => {
    if (mapRef.current && highlightedLocation) {
      setSelectedLocation(highlightedLocation);
      mapRef.current.panTo({
        lat: parseFloat(highlightedLocation.latitude),
        lng: parseFloat(highlightedLocation.longitude),
      });
    }
  }, [highlightedLocation]);

  const detailCenter = {
    lat: parseFloat(locations[0]?.latitude),
    lng: parseFloat(locations[0]?.longitude),
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={isDetail ? detailCenter : initialCenter}
      zoom={10}
      onLoad={(map) => (mapRef.current = map)}
    >
      {locations.map((location) => (
        <MarkerF
          key={location.propertyID}
          position={{
            lat: parseFloat(location.latitude),
            lng: parseFloat(location.longitude),
          }}
          onClick={() => handleLocationClick(location)}
          icon={customMarkerIcon(
            highlightedLocation &&
              highlightedLocation.propertyID === location.propertyID
              ? "blue"
              : "red"
          )}
          label={{
            color:
              highlightedLocation &&
              highlightedLocation.propertyID === location.propertyID
                ? "blue"
                : "black",
            fontWeight: "bold",
            fontSize: "12px",
          }}
        />
      ))}

      {selectedLocation && (
        <InfoWindowF
          key={selectedLocation.propertyID}
          position={{
            lat: parseFloat(selectedLocation.latitude),
            lng: parseFloat(selectedLocation.longitude),
          }}
          onCloseClick={() => setSelectedLocation(null)}
        >
          <div
            className="p-2 w-full h-full cursor-pointer bg-white rounded-lg shadow-md"
            onClick={() =>
              !isDetail && handleCardClick(selectedLocation.propertyID)
            }
          >
            <h3 className="text-sm font-semibold text-blue-700">
              {selectedLocation.propertyName}
            </h3>
            <p className="text-xs text-gray-600">Click for details</p>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(GoogleMaps);
