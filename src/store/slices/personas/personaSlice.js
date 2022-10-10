import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading     : false,
  personas      : [],
  requestStatus : 0
}

export const personaSlice = createSlice({
  name: 'persona',
  initialState,
  reducers: {
    startLoadingPersonas: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLoading = true
    },
    setPersonas : (state, action) => {
      state.personas  = action.payload.personas
    },
    setRequestStatus    : (state, action) => {
      state.isLoading     = false
      state.requestStatus = action.payload.requestStatus
    }
  },
})

// Action creators are generated for each case reducer function
export const { startLoadingPersonas, setPersonas, setRequestStatus } = personaSlice.actions
