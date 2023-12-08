import React from 'react'
import styles from './Form.module.css'
// import OutlinedInput from '@mui/material/OutlinedInput';
// or
import { Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';

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

const RegisterForm = ({ setIsRegistered }) => {
  return (
    <>
      <form className={styles.loginForm}>
        <ThemeProvider theme={theme}>
          <div className={styles.inputContainer}>
            <TextField
              className={styles.input}
              id="standard-basic"
              label="Email"
              variant="standard"
              color='green' />
            <TextField
              className={styles.input}
              id="standard-basic"
              label="Contaseña"
              variant="standard"
              color='green'
              type='password' />
            <TextField
              className={styles.input}
              id="standard-basic"
              label="Repetir contaseña"
              variant="standard"
              color='green'
              type='password' />
            <Button
              style={{ marginTop: '1rem' }}
              variant='contained'
              color='green'
            >
              Registrarse
            </Button>
          </div>
        </ThemeProvider>
      </form>
      <div className={styles.loginFooter}>
        <p>¿Ya tienes cuenta?
          <span
            style={{ color: '#008588', textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => setIsRegistered(true)}
          >
            Ingresa aquí
          </span>
        </p>
      </div>
    </>
  )
}

export default RegisterForm