import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {  crearNuevaPersonaAsync, editarPersonaAsync, getPersonaPorNumeroAsync } from './thunks'

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
  extraReducers : builder => {
    builder.addCase(getPersonaPorNumeroAsync.fulfilled, (state,action) => {
      state.isLoading     = false
      state.requestStatus = action.payload.status
      state.personas      = action.payload.data
    })
    builder.addCase(getPersonaPorNumeroAsync.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(crearNuevaPersonaAsync.fulfilled, (state,action) => {
      state.isLoading     = false
      state.requestStatus = action.payload.status
    })
    builder.addCase(crearNuevaPersonaAsync.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(editarPersonaAsync.fulfilled, (state,action) => {
      state.isLoading     = false
      state.requestStatus = action.payload.status
    })
    builder.addCase(editarPersonaAsync.pending, (state, action) => {
      state.isLoading = true
      state.personas  = []
    })
  }
})



// Action creators are generated for each case reducer function
export const { startLoadingPersonas, setPersonas, setRequestStatus } = personaSlice.actions
