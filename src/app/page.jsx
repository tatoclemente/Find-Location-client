import styles from './page.module.css'
import Login from './login/page'

export default function Home() {

  return (
    <div className={styles.main}>
      <Login />
    </div>
  )
}
