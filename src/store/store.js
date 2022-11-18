import { configureStore } from '@reduxjs/toolkit';
import { usuarioSlice } from './slices/usuarios';
import { personaSlice } from './slices/personas';
import { documentoSlice } from './slices/documentos';
import { jwtSlice } from './slices/jwt/JwtSlice';

const reducer = {
  usuario   : usuarioSlice.reducer,
  persona   : personaSlice.reducer,
  documento : documentoSlice.reducer,
  jwttoken  : jwtSlice.reducer
}

export const store = configureStore({
  reducer,
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      // ignoredActions: ['your/action/type'],
      // Ignore these field paths in all actions
      ignoredActionPaths: ['payload.request', 'payload.config'],
      // Ignore these paths in the state
      ignoredPaths: ['persona.personas.0.config', 'persona.personas.0.request', 'persona.personas.1.request', ',payload.request', 'payload.config'],
    },
  }) })

