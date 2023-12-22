

import styles from './Form.module.css'
import axios from 'axios'
// import OutlinedInput from '@mui/material/OutlinedInput';
// or
import { Button, Input, OutlinedInput, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

import { useForm } from '@/hooks/useForm';

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

  const router = useRouter()

  const { login, handleChange } = useForm()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('http://localhost:3001/login', login)
      data.message && router.push('/tutorial')
    } catch (error) {
      console.error(error.response.data.error);
      alert(error.response.data.error)
    }
  }

  

  return (
    <>
      <form className={styles.loginForm}>
        <ThemeProvider theme={theme}>
          <div className={styles.inputContainer}>
            <TextField
              onChange={handleChange}
              className={styles.input}
              id="email"
              label="Email"
              variant="standard"
              color='green'
              type='email'
              autoComplete="current-email"
              name='email'
              value={login.email} />
            <TextField
              onChange={handleChange}
              className={styles.input}
              id="password"
              label="Contaseña"
              variant="standard"
              color='green'
              type='password'
              autoComplete="current-password"
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