import { createAsyncThunk } from '@reduxjs/toolkit';
import { juetaenoApi } from '../../../api/juetaeno-backend-api';
import { setUser, startLoadingUsers, setRequestStatus, setListadoUsuarios } from "./usuarioSlice";

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
        //console.log(resp)
        return resp
        // dispatch(setRequestStatus({requestStatus : resp.status}))  
      }  
      catch(error) {
        dispatch(setRequestStatus({requestStatus : error.response.status})) 
        console.log(error);
        return error
      }
}) 

export const actualizarContrasenia = (body, params) => {
    return async (dispatch, getState) => {
    try{
        dispatch(startLoadingUsers())
        const resp = await juetaenoApi.put(`/users/${params.idUsuario}`, {
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
          return error;
        }
    }
} 

export const editarUsuarioAsync = createAsyncThunk( 'usuario/editarUsuarioAsync' ,async (body, {getState, dispatch}) => {
  try {
      const resp     = await juetaenoApi.put(`/users/${body.idUsuario}`, {
        usuario         : body.usuario,
        email           : body.email,
        area            : body.area,
        rolEditado      : body.rolEditado,
        rol             : JSON.parse(localStorage.getItem("usuario")).rol
      },{
          headers : {
              'Authorization' : mToken
          }
      })
      return resp
    }  
    catch(error) {
      dispatch(setRequestStatus({requestStatus : error.response.status})) 
      console.log(error);
      return error;
    }
}) 

export const getUsuarios = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoadingUsers());
     
      const resp = await juetaenoApi(
        {
          method : "get",
          url : "/users/all",
          data : {
            rol : JSON.parse(localStorage.getItem("usuario")).rol
          },
          headers : {
            "Authorization" : mToken
          }
        }
      );

      
       const usuarios = resp.data.mensaje
       const vector = []
       for (let i = 0; i < usuarios.length; i++) {
        let e = {
          _id             : usuarios[i]._id,
          usuario         : usuarios[i].usuario,
          email           : usuarios[i].email,
          area            : usuarios[i].area,
          rol             : usuarios[i].rol,
          nombre          : usuarios[i].idPersona.nombre,
          apellido        : usuarios[i].idPersona.apellido, 
          tipoDocumento   : usuarios[i].idPersona.tipoDocumento,
          nroDocumento    : usuarios[i].idPersona.nroDocumento,
          fechaNacimiento : usuarios[i].idPersona.fechaNacimiento,
          nroTelefono     : usuarios[i].idPersona.nroTelefono
        }
        vector.push(e)
       }
       console.log(vector)
      dispatch(
        setListadoUsuarios({ listadoUsuarios: vector })
      );
      dispatch(setRequestStatus({ requestStatus: resp.status }));
    } catch (error) {
      dispatch(setRequestStatus({ requestStatus: error.response.status }));
      console.log(error);
    }
  };
}; 

export const getUsuarioPorIdAsync =  createAsyncThunk("usuario/getUsuarioPorIdASync", async (idUsuario, {getState, dispatch}) => {
  try {
      
    const resp = await juetaenoApi(
      {
        method  : "get",
        url     : `/users/${idUsuario}`,
        headers : {
          "Authorization" : mToken
        }
      }
    );
    const result = {
      mensaje : {
        usuario         : resp.data.mensaje.usuario,
        email           : resp.data.mensaje.email,
        area            : resp.data.mensaje.area,
        rol             : resp.data.mensaje.rol,
        nombre          : resp.data.mensaje.idPersona.nombre,
        apellido        : resp.data.mensaje.idPersona.apellido,
        tipoDocumento   : resp.data.mensaje.idPersona.tipoDocumento,
        nroDocumento    : resp.data.mensaje.idPersona.nroDocumento,
        fechaNacimiento : resp.data.mensaje.idPersona.fechaNacimiento,
        telefono        : resp.data.mensaje.idPersona.nroTelefono,
        idPersona       : resp.data.mensaje.idPersona._id,
      },
      status : resp.status
    }
    return result

  } catch (error) {
    dispatch(setRequestStatus({ requestStatus: error.response.status }));
    console.log(error);
  }
});
    