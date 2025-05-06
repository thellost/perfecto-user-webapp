import React, {useEffect, useRef, useState} from "react";
import {GoogleMap, MarkerF, useLoadScript} from '@react-google-maps/api';
import {
    setKey,
    setDefaults,
    setLanguage,
    setRegion,
    fromAddress,
    fromLatLng,
    fromPlaceId,
    setLocationType,
    geocode,
    RequestType,
    OutputFormat
} from 'react-geocode';

type MapProps = {
    parent_latitude?: number;
    parent_longitude?: number;
    onLocationChange?: React.Dispatch<React.SetStateAction<{
        lat: number;
        lng: number;
    }>> | undefined;
};

const Map = ({parent_latitude = 37.7749, parent_longitude = -122.4194, onLocationChange = undefined} : MapProps ) => {
    setDefaults({
        key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? "", // Your API key here.
        language: "en", // Default language for responses.
        region: "es",
        outputFormat: OutputFormat.XML
    });

    useEffect(() => {
        setLatitude(parent_latitude);
        setLongitude(parent_longitude);
        setDefaultCenter({ lat: parent_latitude, lng: parent_longitude });
    }, [parent_latitude, parent_longitude]);
    const [latitude,
        setLatitude] = useState(parent_latitude);
    const [longitude,
        setLongitude] = useState(parent_longitude);
    const [address,
        setAddress] = useState('');
    const [defaultCenter,
        setDefaultCenter] = useState({lat: parent_latitude, lng: parent_longitude});
    const {isLoaded} = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? ""
    });

    const mapContainerStyle = {
        height: '400px',
        width: '100%'
    };

    const handleMapClick = (event : google.maps.MapMouseEvent) => {
        if (event.latLng) {
            const lat = event
                .latLng
                .lat();
            const lng = event
                .latLng
                .lng();
            setLatitude(lat);
            setLongitude(lng);
            setDefaultCenter({lat, lng});
            if (onLocationChange) {
                
            console.log({lat, lng});
                onLocationChange({lat, lng});
            }
            fromLatLng(lat, lng).then((response) => {
                const address = response.results[0].formatted_address;
                setAddress(address);
            }, (error) => {
                console.error(error);
            });
        }
    };

    return isLoaded
        ? (
            <div>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={10}
                    center={defaultCenter}
                    onClick={handleMapClick}>
                    {latitude && longitude && <MarkerF
                        position={{
                        lat: latitude,
                        lng: longitude
                    }}/>}
                </GoogleMap>
            </div>
        )
        : (
            <div>Loading...</div>
        );
};

export default Map;