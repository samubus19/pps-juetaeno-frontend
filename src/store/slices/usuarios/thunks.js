import { createAsyncThunk } from '@reduxjs/toolkit';
import { juetaenoApi } from '../../../api/juetaeno-backend-api';
import { startLoadingUsers, setRequestStatus, setListadoUsuarios } from "./usuarioSlice";
import desencriptarUsuario from '../../../helpers/Desencriptador'

const mToken = JSON.parse(localStorage.getItem("token"))

export const loginUsuario = createAsyncThunk('usuario/loginUsuario', async(body,{getState, dispatch})=>{
  try {
    const resp = await juetaenoApi.post(`/users/login`, {
            usuario     : body.usuario,
            email       : body.email,
            contrasenia : body.contrasenia 
        })

        const result = {
          data : {
            token   : resp.data.token,
            usuario : resp.data.usuario 
          },
          requestStatus : resp.status
        }
        // dispatch(setUser({usuario : resp.data.usuario, token : resp.data.token}))
        // dispatch(setRequestStatus({requestStatus : resp.status})) 
        return result
  } catch (error) {
    dispatch(setRequestStatus({ requestStatus: error.response.status })); 
    return error;
  }
}) 
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
        return resp
      }  
      catch(error) {
        dispatch(setRequestStatus({requestStatus : error.response.status})) 
        return error
      }
}) 

export const cambiarContraseniaAsync = createAsyncThunk( 'usuario/cambiarContraseniaAsync' ,async (body, {getState, dispatch}) => {
  try {
      const resp = await juetaenoApi.put(`/users/passwd/${body.idUsuario}`, {
        contrasenia : body.contrasenia,
        rol         : desencriptarUsuario(localStorage.getItem("usuario").replaceAll('"', ''),  localStorage.getItem("token").replaceAll('"', '')).rol
    },{
        headers : {
            'Authorization' : mToken
        }
    });
    return resp
  
  } catch(error) {
    dispatch(setRequestStatus({requestStatus : error.response.status})) 
    return error;
}
}) 

export const editarUsuarioAsync = createAsyncThunk( 'usuario/editarUsuarioAsync' ,async (body, {getState, dispatch}) => {
  try {
      const resp     = await juetaenoApi.put(`/users/${body.idUsuario}`, {
        usuario         : body.usuario,
        email           : body.email,
        area            : body.area,
        rolEditado      : body.rolEditado,
        rol             : desencriptarUsuario(localStorage.getItem("usuario").replaceAll('"', ''),  localStorage.getItem("token").replaceAll('"', '')).rol
      },{
          headers : {
              'Authorization' : mToken
          }
      })
      return resp
    }  
    catch(error) {
      dispatch(setRequestStatus({requestStatus : error.response.status})) 
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
          url    : "/users/all",
          data   : {
            rol  : desencriptarUsuario(localStorage.getItem("usuario").replaceAll('"', ''),  localStorage.getItem("token").replaceAll('"', '')).rol
          },
          headers : {
            "Authorization" : mToken
          }
        }
      );

       const usuarios = resp.data.mensaje
       const vector   = []

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

      dispatch(setListadoUsuarios({ listadoUsuarios: vector }));
      dispatch(setRequestStatus({ requestStatus: resp.status }));

    } catch (error) {
      dispatch(setRequestStatus({ requestStatus: error.response.status }));
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
  }
});
    