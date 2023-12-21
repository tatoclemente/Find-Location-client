'use client'
import { useState } from 'react'

export const useForm = () => {
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
  return {
    login, 
    setLogin, 
    handleChange
  }
}
