import { Avatar } from '@mui/material'
import styles from './NavBar.module.css'
import Image from 'next/image'

const NavBar = () => {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.leftContainer}>
        <Image width={50} height={50} src="/images/location-icon.png" alt='profile-img' />
        <p className={styles.appName}>Location App</p>
      </div>
        <div className={styles.rightContainer}>
          <p>¡Hi, Gustavo!</p>
          <Avatar alt="Remy Sharp" src="/images/perrito.png" />
        </div>
    </nav>
  )
}

export default NavBar