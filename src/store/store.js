import { configureStore } from '@reduxjs/toolkit';
import { usuarioSlice } from './slices/usuarios';
import { documentoSlice } from './slices/documentos';
export const store = configureStore({
  reducer : {
    usuario : usuarioSlice.reducer,
    documento : documentoSlice.reducer,

    
  },
    
})