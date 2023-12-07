'use client'
import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import LoginForm from './form/LoginForm'

const Login = () => {
  const [videoRef, setVideoRef] = useState(null);

  useEffect(() => {
    // Obtiene el elemento <video>
    const video = document.querySelector("video");
    setVideoRef(video);

    // Reproduce el video
    video.play();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <video
        className={styles.loginImg}
          ref={videoRef}
          src="https://res.cloudinary.com/dt2o36ezn/video/upload/v1701972863/location/vd-login_czckqr.mp4"
          controls={false}
          autoplay
          loop
          muted
        />
        {/* <img  className={styles.loginImg} src="/images/ph-login.png" alt="ph-image" /> */}
      </div>
      <div className={styles.rightContainer}>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login