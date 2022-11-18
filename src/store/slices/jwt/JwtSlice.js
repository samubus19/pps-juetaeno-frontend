import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { verificarTokenAsync }           from './thunks';

const initialState = {
  isLoading     : false,
  valido        : false,
  requestStatus : 0,
};

export const jwtSlice = createSlice({
  name: 'token',
  initialState,
  reducers : {
    startLoading: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLoading = true
    },
    setValido : (state, action) => {
      state.valido  = action.payload.data.valido
    },
    setRequestStatus    : (state, action) => {
      state.isLoading     = false
      state.requestStatus = action.payload.requestStatus
    }
  },
  extraReducers : builder => {
    builder.addCase(verificarTokenAsync.fulfilled, (state,action) => {
      state.isLoading     = false
      state.requestStatus = action.payload.status
      state.valido        = action.payload.data.valido
    })
    builder.addCase(verificarTokenAsync.pending, (state, action) => {
      state.isLoading     = true
    })  
  }
})

// Action creators are generated for each case reducer function
export const { startLoading, setValido, setRequestStatus } =
  jwtSlice.actions;
