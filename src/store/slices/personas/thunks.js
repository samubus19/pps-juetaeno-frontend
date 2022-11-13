import { juetaenoApi } from '../../../api/juetaeno-backend-api';
import { setPersonas, setRequestStatus, startLoadingPersonas } from './personaSlice';

const mToken = JSON.parse(localStorage.getItem("token"))


export const getPersonaPorNumero = (nroDocumento) => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoadingPersonas())
            const resp = await juetaenoApi.get(`/person/${nroDocumento}`,
                {
                    headers : {
                        'Authorization' : mToken
                    },
                    
                });
            dispatch(setPersonas({personas : resp.data}))   
            dispatch(setRequestStatus({requestStatus : resp.status}))
        } catch (error) {
            dispatch(setRequestStatus({requestStatus : error.response.status}))
            console.log(error);            
        }
    }
} 

export const crearNuevaPersona = (body) => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoadingPersonas())

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
            dispatch(setRequestStatus({requestStatus : resp.status}))   
        } catch (error) {
            dispatch(setRequestStatus({requestStatus : error.response.status}))
            console.log(error);            
        }
    }
}

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