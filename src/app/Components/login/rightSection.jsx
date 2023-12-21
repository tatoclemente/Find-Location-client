'use client'

import  { useState } from 'react'
import LoginForm from './form/LoginForm'
import RegisterForm from './form/RegisterForm'
import styles from './Login.module.css'

export const RightSection = () => {
    const [isRegistered, setIsRegistered] = useState(true)
  return (
    <>
     <div className={styles.titleContainer}>
          <h1 className={styles.title}>Locatapp</h1>
          <div className={styles.logoContainer}>
            <img className={styles.topLogo} src="/images/top-logo.png" alt="top-logo" />
            <img className={styles.baseLogo} src="/images/base-logo.png" alt="" />
          </div>
        </div>
        {isRegistered
          ? <LoginForm isRegistered={isRegistered} setIsRegistered={setIsRegistered} />
          : <RegisterForm isRegistered={isRegistered} setIsRegistered={setIsRegistered} />}
    </>
  )
}
