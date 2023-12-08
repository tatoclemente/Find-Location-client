import React from 'react'
import styles from './Form.module.css'
// import OutlinedInput from '@mui/material/OutlinedInput';
// or
import { Button, Input, OutlinedInput, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';
import { redirect } from 'next/navigation';

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
            <Link href="/home">
              <Button
                style={{ marginTop: '1rem' }}
                variant='contained'
                color='green'
              >
                Ingresar
              </Button>
            </Link>
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