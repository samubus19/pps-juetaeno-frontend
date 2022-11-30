import { createSlice }            from '@reduxjs/toolkit'
import { cambiarContraseniaAsync, 
         crearNuevoUsuarioAsync, 
         editarUsuarioAsync, 
         getUsuarioPorIdAsync, 
         loginUsuario}            from './thunks'

const initialState = {
  isLoading       : false,
  usuario         : [],
  listadoUsuarios : [],
  token           : "",
  requestStatus   : 0,
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
    builder.addCase(editarUsuarioAsync.fulfilled, (state, action) => {
      state.isLoading     = false
      state.requestStatus = action.payload.status
    })
    builder.addCase(editarUsuarioAsync.pending, (state, action) => {
      state.isLoading     = true
    })

    builder.addCase(getUsuarioPorIdAsync.fulfilled, (state, action) => {
      state.isLoading     = false
      state.requestStatus = action.payload.status
      state.usuario       = action.payload.mensaje
    })
    builder.addCase(getUsuarioPorIdAsync.pending, (state, action) => {
      state.isLoading     = true
      state.usuario       = []
    })
    builder.addCase(loginUsuario.fulfilled, (state, action) => {
      state.isLoading = false
      if(!!action.payload.data){
        state.usuario   = action.payload.data.usuario
        state.token     = action.payload.data.token
        state.requestStatus = action.payload.requestStatus
        localStorage.setItem("usuario", JSON.stringify(state.usuario));
        localStorage.setItem("token", JSON.stringify(state.token));
      } 
    })
    builder.addCase(loginUsuario.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(cambiarContraseniaAsync.fulfilled, (state, action) => {
      state.isLoading     = false
      state.requestStatus = action.payload.data.requestStatus
    })
    builder.addCase(cambiarContraseniaAsync.pending, (state, action) => {
      state.isLoading = true
    })
  }
})

// Action creators are generated for each case reducer function
export const { startLoadingUsers, setUser, setRequestStatus, setListadoUsuarios } = usuarioSlice.actions;
