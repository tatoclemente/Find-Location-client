import { configureStore } from '@reduxjs/toolkit'
import { personSlice } from './features/person/personSlice'

export const store = () => {
  return configureStore({
    reducer: {
      person: personSlice
    }
  })
}