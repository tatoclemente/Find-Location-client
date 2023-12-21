'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './Login.module.css'
export const Video = () => {

  const videoRef = useRef(null)

  useEffect(() => {
    // Obtiene el elemento <video>
    const video = videoRef.current
    if (video)
    // Reproduce el video
    video.play();
  }, [videoRef]);

  return (
    <video
      className={styles.loginImg}
      ref={videoRef}
      src="https://res.cloudinary.com/dt2o36ezn/video/upload/v1701972863/location/vd-login_czckqr.mp4"
      controls={false}
      autoPlay
      loop
      muted
    />
  )
}
