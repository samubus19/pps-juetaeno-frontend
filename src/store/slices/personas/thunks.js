import { juetaenoApi }          from '../../../api/juetaeno-backend-api';
import { setPersonas, 
         setRequestStatus, 
         startLoadingPersonas } from './personaSlice';
import { createAsyncThunk }     from '@reduxjs/toolkit';

const mToken = JSON.parse(localStorage.getItem("token"))

export const getPersonaPorNumeroAsync = createAsyncThunk('persona/getPersonaPorNumeroAsync', async (nroDocumento, {getState, dispatch}) => {
    
    try {
        const resp = await juetaenoApi.get(`/person/${nroDocumento}`,
            {
                headers : {
                    'Authorization' : mToken
                },
            });
            
        return resp    

    } catch (error) {
        dispatch(setRequestStatus({requestStatus : error.response.status}))
    }
})

export const crearNuevaPersonaAsync = createAsyncThunk('persona/crearNuevaPersona',async (body, {getState, dispatch}) => {
    try {
        const resp = await juetaenoApi.post(`/person`,
            {
                nombre          : body.nombre,
                apellido        : body.apellido,
                tipoDocumento   : body.tipoDocumento,
                nroDocumento    : body.nroDocumento,
                fechaNacimiento : body.fechaNacimiento,
                nroTelefono     : body.nroTelefono,
                 rol            : JSON.parse(localStorage.getItem("usuario")).rol
            } ,
            {
                headers : {
                    'authorization' : mToken
                }
            
            });

            return resp

    } catch (error) {
        dispatch(setRequestStatus({requestStatus : error.response.status}))
        return error;          
    }
}) 
export const editarPersonaAsync = createAsyncThunk( 'persona/editarPersonaAsync' ,async (body, {getState, dispatch}) => {
    try {
        const resp     = await juetaenoApi.put(`/person/${body.idPersona}`, {
            nombre          : body.nombre,
            apellido        : body.apellido,
            fechaNacimiento : body.fechaNacimiento,
            nroTelefono     : body.nroTelefono,
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
        return error;
      }
  }) 


  export const eliminarPersonaAsync = createAsyncThunk( 'persona/eliminarPersonaAsync' ,async (body, {getState, dispatch}) => {
    try {

        const resp = await juetaenoApi(
            {
              method : "delete",
              url    : `/person/${body.idPersona}`,
              data   : {
                rol  : JSON.parse(localStorage.getItem("usuario")).rol
              },
              headers : {
                "Authorization" : mToken
              }
            }
          );

        return resp

      }  
      catch(error) {
        dispatch(setRequestStatus({requestStatus : error.response.status})) 
        return error;
      }
  }) 