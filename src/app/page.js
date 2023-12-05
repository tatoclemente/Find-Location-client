import styles from './page.module.css'
import Map from './Components/finder/page'

export default function Home() {

  return (
    <main className={styles.main}>
      <Map />
    </main>
  )
}
