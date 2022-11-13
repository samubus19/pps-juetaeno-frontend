import { juetaenoApi } from '../../../api/juetaeno-backend-api';
import { setUser, startLoadingUsers, setRequestStatus } from "./usuarioSlice";

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
        })
          .catch(function (error) {
            if (error.response) {
              // La respuesta fue hecha y el servidor respondió con un código de estado
              // que esta fuera del rango de 2xx
              alert("Datos ingresados incorrectos")
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // La petición fue hecha pero no se recibió respuesta
              // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
              // http.ClientRequest en node.js
              console.log(error.request);
            } else {
              // Algo paso al preparar la petición que lanzo un Error
              console.log("Error", error.message);
            }
           
          });

        dispatch(setRequestStatus({ requestStatus: resp.status })); 
        dispatch(
          setUser({ usuario: resp.data.usuario, token: resp.data.token })
        );
    }
} 

export const crearNuevoUsuario = (body) => {
    return async (dispatch, getState) => {
    try {
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
      catch(error) {
        console.log(error);
      }
    }
} 

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
          console.log(error)
        }
    }
} 