import { createSlice }               from '@reduxjs/toolkit'
import {  crearNuevaPersonaAsync, 
          editarPersonaAsync, 
          eliminarPersonaAsync, 
          getPersonaPorNumeroAsync } from './thunks'

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
      state.isLoading     = true
    },
    setPersonas : (state, action) => {
      state.personas      = action.payload.personas
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
      state.isLoading     = true
    })

    builder.addCase(crearNuevaPersonaAsync.fulfilled, (state,action) => {
      state.isLoading     = false
      state.requestStatus = action.payload.status
    })
    builder.addCase(crearNuevaPersonaAsync.pending, (state, action) => {
      state.isLoading     = true
    })

    builder.addCase(editarPersonaAsync.fulfilled, (state,action) => {
      state.isLoading     = false
      state.requestStatus = action.payload.status
    })
    builder.addCase(editarPersonaAsync.pending, (state, action) => {
      state.isLoading     = true
      state.personas      = []
    })

    builder.addCase(eliminarPersonaAsync.fulfilled, ( state, action)  => {
      state.isLoading     = false
      state.requestStatus = action.payload.status
    })
    builder.addCase(eliminarPersonaAsync.pending, (state, action) => {
      state.isLoading     = true
    })
  }
})



// Action creators are generated for each case reducer function
export const { startLoadingPersonas, setPersonas, setRequestStatus } = personaSlice.actions
