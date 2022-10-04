import { configureStore } from '@reduxjs/toolkit';
import { usuarioSlice } from './slices/usuarios';

export const store = configureStore({
  reducer : {
    usuario : usuarioSlice.reducer},
})