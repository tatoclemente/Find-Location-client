import Image from 'next/image'
import styles from './page.module.css'
import Finder from './finder/page'
import Map from './finder/page'

export default function Home() {

  // const apiKey = process.env.GOOGLE_MAPS_API_KEY
  return (
    <main className={styles.main}>
      {/* <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=-31.859856, -62.721137`}
        width="600"
        height="450"
        frameborder="0"
        allowfullscreen
      ></iframe> */}
      <Map />
    </main>
  )
}
