import React from 'react'
import styles from './Loading.module.css'

const Loading = () => {
  const animationDelay = (i) => `calc(.2s * var(--i))`;
  return (
    <div className={styles.bg7}>
      <h1 className={styles.tStroke}>BIENVENIDO</h1>
    </div>
  )
}

export default Loading