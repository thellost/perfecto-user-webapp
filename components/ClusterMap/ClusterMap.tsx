
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { GoogleMap, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { debounce } from "lodash";
import { Properties } from "@/app/types/DefaultType";
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

type Props = {
  properties : Properties[],
  onBoundsChanged : any,
}
const ClusterMap = ({properties, onBoundsChanged}:Props) => {
  const [mapCenter, setMapCenter] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });
  const [selectedProperty, setSelectedProperty] = useState<Properties>();
  const mapRef = useRef<google.maps.Map>(null);
  const markerClustererRef = useRef<MarkerClusterer>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const prevPropertiesRef = useRef<Properties[]>([]);

  const { isLoaded, loadError } = useLoadScript({
    id: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? "",
  });

  const handleCenterChanged = () => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter();
      setMapCenter({
        lat: newCenter?.lat() || 37.7749,
        lng: newCenter?.lng() || -122.4194,
      });
    }
  };

  useEffect(() => {
    const updateMarkers = () => {
      if (mapRef.current && isLoaded) {
        // Clear previous markers
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        console.log(properties[0].latitude, properties[0].longitude)
        // Create new markers
        const newMarkers = properties.map((point) => {
          const marker = new window.google.maps.Marker({
            position: {
              lat: point.latitude,
              lng: point.longitude,
            },
          });
          
          console.log(marker)
          marker.addListener("click", () => handleMarkerClick(point));
          return marker;
        });

        markersRef.current = newMarkers;

        if (markerClustererRef.current) {
          markerClustererRef.current.clearMarkers();
          markerClustererRef.current.addMarkers(markersRef.current);
        } else {
          markerClustererRef.current = new MarkerClusterer({
            markers: markersRef.current,
            map: mapRef.current,
          });
        }
      }
    };

    if (
      JSON.stringify(prevPropertiesRef.current) !== JSON.stringify(properties)
    ) {
      updateMarkers();
      prevPropertiesRef.current = properties; // Update the cached properties
    }
  }, [isLoaded, properties]);

  const navigate = useRouter();

  const handleMarkerClick = (property: React.SetStateAction<Properties | undefined>) => {
    setSelectedProperty(property);
  };

  const handleNavigate = (propertyID: string) => {
    navigate.push(`/property-details/${propertyID}`);
  };

  // Debounced version of handleBoundsChanged
  const debouncedHandleBoundsChanged = useCallback(
    debounce(() => {
      if (mapRef.current) {
        const bounds = mapRef.current.getBounds();
        if (bounds && onBoundsChanged) {
          const ne = bounds.getNorthEast();
          const sw = bounds.getSouthWest();
          onBoundsChanged({
            minLat: sw.lat(),
            maxLat: ne.lat(),
            minLng: sw.lng(),
            maxLng: ne.lng(),
          });
        }
      }
    }, 300),
    [onBoundsChanged]
  );

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <div className="sm:h-[100vh] h-[65vh] w-[100%]">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={10}
        options={defaultOptions}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        onDragEnd={handleCenterChanged}
        onZoomChanged={debouncedHandleBoundsChanged}
        onBoundsChanged={debouncedHandleBoundsChanged}
      >
        {selectedProperty && (
          <InfoWindow
            position={{
              lat: selectedProperty?.latitude,
              lng: selectedProperty?.longitude,
            }}
            onCloseClick={() => setSelectedProperty(undefined)}
          >
            <div
              className="bg-white text-[#f08e80] gap-3 text-center text-[12px] font-medium flex  items-start cursor-pointer w-[190px]"
              onClick={() => handleNavigate(selectedProperty.id)}
            >
              <div>
                <img
                  src={
                    selectedProperty.image ||
                    (selectedProperty.propertyImages &&
                      selectedProperty.propertyImages[0])
                  }
                  alt={selectedProperty.name}
                  className="w-auto h-[68px] object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col items-start mt-2">
                {/* <div>
                  {selectedProperty.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </div> */}
                <div>Bath: {selectedProperty?.baths} </div>
                <div>Beds: {selectedProperty?.beds}</div>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
export default ClusterMap