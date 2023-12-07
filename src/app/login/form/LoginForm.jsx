import React from 'react'
import styles from './Form.module.css'
const LoginForm = () => {
  return (
    <>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Locatapp</h1>
        <div className={styles.logoContainer}>
          <img className={styles.topLogo} src="/images/top-logo.png" alt="top-logo" />
          <img className={styles.baseLogo} src="/images/base-logo.png" alt="" />
        </div>
      </div>
      <form>
        <input type="text" placeholder='Enter Username' />
        <input type="text" placeholder='Enter Password' />
        <button>Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Signup</a></p>
      <p>Forgot Password? <a href="/forgotpassword">Reset Password</a></p>
    </>
  )
}

export default LoginForm