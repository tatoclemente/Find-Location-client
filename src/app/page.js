import Image from 'next/image'
import styles from './page.module.css'
import Finder from './finder/page'
import Map from './finder/page'

export default function Home() {

  return (
    <main className={styles.main}>
      <Map />
    </main>
  )
}
