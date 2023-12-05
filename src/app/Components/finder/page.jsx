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
    // get current location
    const handleGetLocationClick = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log(latitude, longitude);
            setSelectedPlace(null);
            setSearchLngLat(null);
            setCurrentLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

      // on map load
  // const onMapLoad = (map) => {
  //   const controlDiv = document.createElement("div");
  //   const controlUI = document.createElement("div");
  //   controlUI.innerHTML = "Get Location";
  //   controlUI.style.backgroundColor = "white";
  //   controlUI.style.color = "black";
  //   controlUI.style.border = "2px solid #ccc";
  //   controlUI.style.borderRadius = "3px";
  //   controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  //   controlUI.style.cursor = "pointer";
  //   controlUI.style.marginBottom = "22px";
  //   controlUI.style.textAlign = "center";
  //   controlUI.style.width = "100%";
  //   controlUI.style.padding = "8px 10px";
  //   controlUI.addEventListener("click", handleGetLocationClick);
  //   controlDiv.appendChild(controlUI);

  //   // const centerControl = new window.google.maps.ControlPosition(
  //   //   window.google.maps.ControlPosition.TOP_CENTER,
  //   //   0,
  //   //   10
  //   // );

  //   map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
  //     controlDiv
  //   );
  // };


  
  const onDragEnd = (event) => {
    const { lat, lng } = event.latLng;
    setSearchLngLat({ lat, lng });
    
      console.log(searchLngLat.lat(), searchLngLat.lng());
  }


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
      <button className="button-location" onClick={handleGetLocationClick}>Get Current Location</button>

      {/* map component  */}
      <GoogleMap
        zoom={currentLocation || selectedPlace ? 18 : 12}
        center={currentLocation || searchLngLat || centerLatLng}
        mapContainerClassName="map"
        onLoad={onMapLoad}
      >
        {selectedPlace && <Marker position={searchLngLat} />}
        {currentLocation && 
          <Marker 
            draggable={true} 
            position={currentLocation}
            onDragEnd={onDragEnd}
            // onDragend={(event) => {
            //   const { lat, lng } = event.latLng;
          
            //   // Actualiza la ubicación
            //   console.log('hola');
            //   setSearchLngLat({ lat, lng });
            // }} 
            />}
      </GoogleMap>
    </div>
  );
};

export default Map;
