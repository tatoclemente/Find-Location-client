'use client'
import React, { useState, useRef } from "react";
import {
  Autocomplete,
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import styles from './finder.module.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';

const centerLatLng = {
  lat: -31.859856,
  lng: -62.721137
};

const libraries = ['places']
// const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
const apiKey = ''
const Map = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchLngLat, setSearchLngLat] = useState(null);
  const autocompleteRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null)
  const [address, setAddress] = useState("");

  // laod script for google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  if (!isLoaded) return <div>Loading....</div>;

  // handle place change on search
  const handlePlaceChanged = () => {
    // event.preventDefault();
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


  const onDragEnd = (event) => {
    const { lat, lng } = event.latLng;
    setSearchLngLat({ lat, lng });

    console.log(searchLngLat.lat(), searchLngLat.lng());
  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


  return (
    <div
      className={styles.mapContainer}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <div className={styles.searchContainer}>
        {/* search component  */}
        <Autocomplete
          onLoad={(autocomplete) => {
            console.log("Autocomplete loaded:", autocomplete);
            autocompleteRef.current = autocomplete;
          }}
          onPlaceChanged={handlePlaceChanged}
          options={{ fields: ["address_components", "geometry", "name"] }}
        >
          <input className={styles.placesContainer} type="text" placeholder="Busca una dirección..." />
        </Autocomplete>
        <Button 
          // className={styles.buttonLocation} 
          component="label" 
          variant="contained" 
          startIcon={<LocationOnIcon />}
          onClick={handleGetLocationClick}>
          Obtega su ubicación
          <VisuallyHiddenInput type="file" />
        </Button>
        {/* <button className={styles.buttonLocation} onClick={handleGetLocationClick}>Obtega su ubicación<LocationOnIcon sx={{ color: '#f09999', fontSize: '1.7rem' }} /></button> */}
      </div>

      {/* map component  */}
      <GoogleMap
        zoom={currentLocation || selectedPlace ? 18 : 12}
        center={currentLocation || searchLngLat || centerLatLng}
        mapContainerClassName={styles.map}
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
      <button className={styles.buttonConfirm}>Confirmar ubicación</button>
    </div>
  );
};

export default Map;
