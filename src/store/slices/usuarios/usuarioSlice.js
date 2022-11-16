import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { crearNuevoUsuarioAsync } from './thunks'

const initialState = {
  isLoading: false,
  usuario: [],
  listadoUsuarios: [],
  token: "",
  requestStatus: 0,
};

export const usuarioSlice = createSlice({
  name: 'usuario',
  initialState,
  reducers: {
    startLoadingUsers: (state) => {
      state.isLoading = true
    },
    setUser : (state, action) => {
      state.usuario   = action.payload.usuario
      state.token     = action.payload.token
      localStorage.setItem("usuario", JSON.stringify(state.usuario));
      localStorage.setItem("token", JSON.stringify(state.token));
    },
     setListadoUsuarios   : (state, action) => {
     state.listadoUsuarios = action.payload.listadoUsuarios
    },
    setRequestStatus    : (state, action) => {
      state.isLoading     = false
      state.requestStatus = action.payload.requestStatus
    }
  },
  extraReducers : builder => {
    builder.addCase(crearNuevoUsuarioAsync.fulfilled, (state,action) => {
      state.isLoading     = false
      state.requestStatus = action.payload.status
    })
    builder.addCase(crearNuevoUsuarioAsync.pending, (state, action) => {
      state.isLoading     = true
    })
  }
})

// Action creators are generated for each case reducer function
export const { startLoadingUsers, setUser, setRequestStatus, setListadoUsuarios } =
  usuarioSlice.actions;
