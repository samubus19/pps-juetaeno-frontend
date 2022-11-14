import { createAsyncThunk } from '@reduxjs/toolkit';
import { juetaenoApi } from '../../../api/juetaeno-backend-api';
import { setUser, startLoadingUsers, setRequestStatus } from "./usuarioSlice";

const mToken = JSON.parse(localStorage.getItem("token"))

export const loginUsuario = (body) => {
    return async (dispatch, getState) => {

       dispatch(startLoadingUsers())
        const resp = await juetaenoApi.post(`/users/login`, {
            usuario     : body.usuario,
            email       : body.email,
            contrasenia : body.contrasenia 
        })
          .catch(function (error) {
            if (error.response) {
              // La respuesta fue hecha y el servidor respondió con un código de estado
              // que esta fuera del rango de 2xx
              alert("Datos ingresados incorrectos")
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              dispatch(setRequestStatus({requestStatus : error.response.status}))
            } else if (error.request) {
              // La petición fue hecha pero no se recibió respuesta
              // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
              // http.ClientRequest en node.js
              dispatch(setRequestStatus({requestStatus : error.response.status}))
              console.log(error.request);
            } else {
              dispatch(setRequestStatus({requestStatus : error.response.status})) 
              // Algo paso al preparar la petición que lanzo un Error
              console.log("Error", error.message);
            }
           
          });

          dispatch(setUser({usuario : resp.data.usuario, token : resp.data.token}))
          dispatch(setRequestStatus({requestStatus : resp.status})) 

    }
} 

export const crearNuevoUsuarioAsync = createAsyncThunk( 'usuario/crearNuevoUsuarioAsync' ,async (body, {getState, dispatch}) => {
    try {
        // dispatch(startLoadingUsers())
        const resp = await juetaenoApi.post(`/users`, {
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
        })
        console.log(resp)
        return resp
        // dispatch(setRequestStatus({requestStatus : resp.status}))  
      }  
      catch(error) {
        dispatch(setRequestStatus({requestStatus : error.response.status})) 
        console.log(error);
      }
}) 

export const actualizarContrasenia = (body, params) => {
    return async (dispatch, getState) => {
    try{
        dispatch(startLoadingUsers())
        const resp = await juetaenoApi.pu(`/users/${params.idUsuario}`, {
            contrasenia : body.contrasenia,
        },{
            headers : {
                'Authorization' : mToken
            }
        });

        dispatch(setRequestStatus({requestStatus : resp.status}))  
        } catch(error) {
          dispatch(setRequestStatus({requestStatus : error.response.status})) 

          console.log(error)
        }
    }
} 