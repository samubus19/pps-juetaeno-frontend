import { configureStore } from '@reduxjs/toolkit';
import { usuarioSlice } from './slices/usuarios';
import { personaSlice } from './slices/personas';
import { documentoSlice } from './slices/documentos';

const reducer = {
  usuario   : usuarioSlice.reducer,
  persona   : personaSlice.reducer,
  documento : documentoSlice.reducer
}

export const store = configureStore({reducer})