import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    person: []

}

const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        addPerson: (state, action) => {
            state.person.push(action.payload)
        }
    }
})

export const { addPerson } = personSlice.actions
export default personSlice.reducer