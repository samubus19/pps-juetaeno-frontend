import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading : false,
  usuario : [],
  token : ""
}

export const usuarioSlice = createSlice({
  name: 'usuario',
  initialState,
  reducers: {
    startLoadingUsers: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLoading = true
    },
    setUser : (state, action) => {
      state.isLoading = false
      state.usuario   = action.payload.usuario
      state.token     = action.payload.token
      localStorage.setItem("usuario", JSON.stringify(state.usuario));
      localStorage.setItem("token", JSON.stringify(state.token));
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { startLoadingUsers, setUser } = usuarioSlice.actions
