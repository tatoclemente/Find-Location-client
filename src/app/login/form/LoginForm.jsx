'use client'

import React, { useState } from 'react'
import { useEffect, useContex, useCookies } from 'next/router'
import styles from './Form.module.css'
import axios from 'axios'
// import OutlinedInput from '@mui/material/OutlinedInput';
// or
import { Button, Input, OutlinedInput, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import next from 'next'

const theme = createTheme({
  palette: {
    green: {
      main: '#008588',
      light: '#01c4ca',
      dark: '#007678',
      contrastText: '#ffffff',
    },
  },
});


const LoginForm = ({ setIsRegistered }) => {

  const [login, setLogin] = useState({
    email: '',
    password: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setLogin({
      ...login,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await axios.post('http://localhost:3001/login', login)
    console.log(data);
  }

  return (
    <>
      <form className={styles.loginForm}>
        <ThemeProvider theme={theme}>
          <div className={styles.inputContainer}>
            <TextField
              onChange={handleChange}
              className={styles.input}
              id="standard-basic"
              label="Email"
              variant="standard"
              color='green'
              name='email'
              value={login.email} />
            <TextField
              onChange={handleChange}
              className={styles.input}
              id="standard-basic"
              label="Contaseña"
              variant="standard"
              color='green'
              type='password'
              name='password'
              value={login.password} />
              <Button
                onClick={handleSubmit}
                style={{ marginTop: '1rem' }}
                variant='contained'
                color='green'
              >
                Ingresar
              </Button>
          </div>
        </ThemeProvider>
      </form>
      <div className={styles.loginFooter}>
        <p>¿Aun no tiens cuenta?
          <span
            style={{ color: '#008588', textDecoration: 'underline', cursor: 'pointer', marginLeft: '0.5rem' }}
            onClick={() => setIsRegistered(false)}
          >
            Registrate
          </span></p>
        <p><Link style={{ color: '#008588', textDecoration: 'underline' }} href="">Restablecer contraseña</Link></p>
      </div>
    </>
  )
}

export default LoginForm