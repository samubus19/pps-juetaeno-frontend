import { createSlice }         from '@reduxjs/toolkit'
import { verificarTokenAsync } from './thunks';

const initialState = {
  isLoading     : false,
  valido        : false,
  requestStatus : 0,
};

export const jwtSlice = createSlice({
  name : 'token',
  initialState,
  reducers : {
    startLoading: (state) => {
      state.isLoading = true
    },
   
    setValido : (state, action) =>{
      state.valido =action.payload.valido
    },
    setRequestStatus    : (state, action) => {
      state.isLoading     = false
      state.requestStatus = action.payload.requestStatus
    }
  },
  extraReducers : builder => {
    builder.addCase(verificarTokenAsync.fulfilled, (state,action) => {
      state.isLoading     = false
      if(action.payload) {
        state.requestStatus = action.payload.status
        state.valido        = action.payload.data.valido
      } else {
        state.requestStatus = action.payload.data.status
        state.valido        = action.payload.data.valido
      }
    })
    builder.addCase(verificarTokenAsync.pending, (state, action) => {
      state.isLoading       = true
    })  
  }
})

// Action creators are generated for each case reducer function
export const { startLoading, setValido, setRequestStatus } = jwtSlice.actions;
