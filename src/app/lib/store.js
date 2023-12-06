import { configureStore } from '@reduxjs/toolkit'
import personSlice from './personSlice'

export const store = () => {
  return configureStore({
    reducer: {
      person: personSlice
    }
  })
}