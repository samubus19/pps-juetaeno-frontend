import { juetaenoApi } from '../../../api/juetaeno-backend-api';
import { setPersonas, setRequestStatus, startLoadingPersonas } from './personaSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

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
                nroTelefono     : body.nroTelefono
            } ,
            {
                headers : {
                    'authorization' : mToken
                }
            
            });
            return resp
        // dispatch(setRequestStatus({requestStatus : resp.status}))   
    } catch (error) {
        dispatch(setRequestStatus({requestStatus : error.response.status}))
        console.log(error);            
    }
}) 
    
// export const editarPersona = (nroDocumento, body) => {
//     return async (dispatch, getState) => {
//         dispatch(startLoadingDocuments())

//         const resp = await juetaenoApi.post(`/files/${nroDocumento}`, {
//             nroExpediente : body.nroExpediente,
//             tipoDocumento : body.tipoDocumento,
//             fechaIngreso  : body.fechaIngreso,
//             fechaSalida   : body.fechaSalida,
//             estadoActual  : body.estadoActual,
//             descripcion   : body.descripcion,
//             sedeActual    : body.sedeActual,
//         });
//         dispatch(setRequestStatus({requestStatus : resp.status}))
//     }
// }