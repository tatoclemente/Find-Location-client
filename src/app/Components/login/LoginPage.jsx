// 'use client'

import { RightSection, Video } from ".."
import styles from './Login.module.css'


export const LoginPage = () => {

  return (
    <>
      <div className={styles.leftContainer}>
        <Video />
      </div>
      <div className={styles.rightContainer}>
        <RightSection />
      </div>
    </>
  )
}
