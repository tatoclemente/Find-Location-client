'use client'
import React, { useState, useRef } from "react";
import {
  Autocomplete,
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";


const centerLatLng = {
  lat: -31.859856,
  lng: -62.721137
};

const libraries = ['places']

const Map = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchLngLat, setSearchLngLat] = useState(null);
  const autocompleteRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null)
  const [address, setAddress] = useState("");

  // laod script for google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading....</div>;

  // handle place change on search
  const handlePlaceChanged = (event) => {
    event.preventDefault();
    const place = autocompleteRef.current.getPlace();
    setSelectedPlace(place);

    
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();
    console.log("Lat: ", latitude);
    console.log("Lng: ", longitude);

    if (place) {
      setSearchLngLat({
        lat: latitude,
        lng: longitude,
      });
      console.log(searchLngLat);
    } else {
      setSearchLngLat(null)
    }
    setCurrentLocation(null);
  };

  const onMapLoad = (map) => {
    map.setCenter(centerLatLng);
  };


  return (
    <div
      className="map-container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {/* search component  */}
      <Autocomplete
        onLoad={(autocomplete) => {
          console.log("Autocomplete loaded:", autocomplete);
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={handlePlaceChanged}
        options={{ fields: ["address_components", "geometry", "name"] }}
      >
        <input className="places-container" type="text" placeholder="Search for a location" />
      </Autocomplete>

      {/* map component  */}
      <GoogleMap
        zoom={currentLocation || selectedPlace ? 18 : 12}
        center={currentLocation || searchLngLat || centerLatLng}
        mapContainerClassName="map"
        onLoad={onMapLoad}
      >
        {selectedPlace && <Marker position={searchLngLat} />}
      </GoogleMap>
    </div>
  );
};

export default Map;
