import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  person: {
    name: "",
    lastName: "",
    phone: "",
  },
  location: {
    lat: 0,
    lng: 0,
  },
  address: {
    street: "",
    city: "",
    province: "",
    country: "",
  }
}

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    setPerson: (state, action) => {
      state.person = action.payload
      console.log(state.person)
    },
    setLocation: (state, action) => {
      state.location = action.payload
      console.log(state.location)
    },
    setAddress: (state, action) => {
      state.address = action.payload
      console.log(state.address)
    },
  }
})

export const { setPerson, setLocation, setAddress } = personSlice.actions

export default personSlice.reducer