import { juetaenoApi } from '../../../api/juetaeno-backend-api';
import { setUser, startLoadingUsers } from './usuarioSlice';


export const loginUsuario = (body) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingUsers())
        const resp = await juetaenoApi.post(`/users/login`, {
            usuario     : body.usuario,
            email       : body.email,
            contrasenia : body.contrasenia 
        });

        dispatch(setUser({usuario : resp.data.usuario, token : resp.data.token}))
    }
} 