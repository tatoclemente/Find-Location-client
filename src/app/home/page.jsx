'use client'
import React, { useEffect, useState } from 'react'
import styles from './home.module.css'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PublicIcon from '@mui/icons-material/Public';
import { Favorite } from '@mui/icons-material';
import { Button } from '@mui/material';
const HomePage = () => {

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [position, setPosition] = useState(null)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (posicion) {
        const { latitude, longitude } = posicion.coords;
        setPosition({
          latitude,
          longitude,
        });
        // La ubicación del dispositivo se encuentra en el objeto posicion
      },
      function (error) {
        console.log(error.message);
        // Ocurrió un error al obtener la ubicación
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  }, [])

  console.log(position);


  if (!isLoaded) return <div className={styles.mainContainer}>Loading...</div>;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>¡Binvenido!</h1>
          <div className={styles.logoContainer}>
            <img className={styles.topLogo} src="/images/top-logo.png" alt="top-logo" />
            <img className={styles.baseLogo} src="/images/base-logo.png" alt="" />
          </div>
        </div>
        <div className={styles.subtitleContainer}>
          <p className={styles.subtitle}>Estoy aquí, estás aquí, ¡Estamos aquí!</p>
        </div>

        <div className={styles.buttonsContainer}>
          <Button variant="outlined" size="medium" endIcon={<SendIcon />}>
          <span className={styles.spanSend}>Enviar ubicación</span>
          </Button>
          <Button variant="outlined" size="medium" endIcon={<Diversity3Icon />}>
          <span className={styles.spanFriends}>Ver a mis amigos</span>
          </Button>
          <Button variant="outlined" size="medium" endIcon={<Favorite />}>
            <span className={styles.spanFavorites}>Lugares favoritos</span>
          </Button>
          <Button variant="outlined" size="medium" endIcon={<PublicIcon />}>
            <span className={styles.spanExplore}>Explorar</span>
          </Button>
        </div>

      </div>

      <div className={styles.rightContainer}>
        <GoogleMap
          center={position ? { lat: position.latitude, lng: position.longitude } : { lat: -34.397, lng: 150.644 }}
          zoom={16}
          mapContainerClassName={styles.map}
        >
          {position && <Marker icon='/homedark.gif' position={{ lat: position.latitude, lng: position.longitude }} />}
        </GoogleMap>
      </div>
    </div>
  )
}

export default HomePage