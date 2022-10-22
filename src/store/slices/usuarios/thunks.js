import { juetaenoApi } from '../../../api/juetaeno-backend-api';
import { setUser, startLoadingUsers, setRequestStatus } from './usuarioSlice';

const mToken = localStorage.getItem("token")

export const loginUsuario = (body) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingUsers())
        const resp = await juetaenoApi.post(`/users/login`, {
            usuario     : body.usuario,
            email       : body.email,
            contrasenia : body.contrasenia 
        },{
            headers : {
                'Authorization' : mToken
            }
        });

        dispatch(setUser({usuario : resp.data.usuario, token : resp.data.token}))
    }
} 

export const crearNuevoUsuario = (body) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingUsers())
        const resp = await juetaenoApi.post(`/users/login`, {
            usuario     : body.usuario,
            email       : body.email,
            contrasenia : body.contrasenia,
            area        : body.area,
            rol         : body.rol,
            idPersona   : body.idPersona
        },{
            headers : {
                'Authorization' : mToken
            }
        });

        dispatch(setRequestStatus({requestStatus : resp.status}))  
    }
} 

export const actualizarContrasenia = (body, params) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingUsers())
        const resp = await juetaenoApi.pu(`/users/${params.idUsuario}`, {
            contrasenia : body.contrasenia,
        },{
            headers : {
                'Authorization' : mToken
            }
        });

        dispatch(setRequestStatus({requestStatus : resp.status}))  
    }
} 