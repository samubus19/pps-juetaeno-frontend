
import { juetaenoApi } from '../../../api/juetaeno-backend-api';
import {
  setDocuments,
  setRequestStatus,
  startLoadingDocuments,
  setShowDocuments,
} from "./documentoSlice";

const mToken = JSON.parse( localStorage.getItem("token"))

export const getDocumentos = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoadingDocuments())
            const resp = await juetaenoApi.get(`/files`,
            {
                headers : {
                    'Authorization' : mToken
                },
                
            });
            //console.log(resp.data)
            const documento = resp.data.mensaje
            const vector = []
            for (let i = 0; i < documento.length; i++) {
              for (let j = 0; j < documento[i].historial.length; j++) {
                const e = {
                  _id: documento[i]._id,
                  tipoDocumento: documento[i].tipoDocumento,
                  nroDocumento: documento[i].nroDocumento,
                  descripcion: documento[i].descripcion,
                  fechaIngreso: documento[i].historial[j].fechaIngreso,
                  fechaSalida: documento[i].historial[j].fechaSalida,
                  sede: documento[i].historial[j].sede,
                  destino: documento[i].historial[j].destino,
                  estado: documento[i].historial[j].estado,
                };
                vector.push(e);
              }
            }
            
            dispatch(setDocuments({documentos : resp.data.mensaje, showDocumentos: vector}))
            dispatch(setRequestStatus({requestStatus : resp.status}))
        } catch (error) {
            console.log(error);
        }
    }
} 

export const getDocumentoPorNumero = (nroDocumento) => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoadingDocuments())
            const resp = await juetaenoApi.get(`/files/${nroDocumento}`,
            {
                headers : {
                    'Authorization' : mToken
                },
                
            });
            dispatch(setDocuments({documentos : resp.data}))
            dispatch(setRequestStatus({requestStatus : resp.status}))   
        } catch (error) {
            console.log(error)
        }
    }
} 

export const crearNuevoDocumento = (body) => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoadingDocuments())

            const resp = await juetaenoApi.post(`/files`, {
                nroDocumento  : body.nroDocumento,
                tipoDocumento : body.tipoDocumento,
                descripcion   : body.descripcion,
                destino       : body.destino,
            },
            {
                headers : {
                    'Authorization' : mToken
                },
                
            });
            dispatch(setRequestStatus({requestStatus : resp.status}))   
        } catch (error) {
            console.log(error);            
        }
    }
}

export const actualizarEstadoDocumento = (nroDocumento, body) => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoadingDocuments())

            const resp = await juetaenoApi.put(`/files/state/${nroDocumento}`, {
                nuevoEstado : body.nuevoEstado,
                destino     : body.destino,
            },
            {
                headers : {
                    'Authorization' : mToken
                },
                
            });
            dispatch(setRequestStatus({requestStatus : resp.status}))   
        } catch (error) {
            console.log(error);            
        }
    }
}

export const editarDocumento = (nroDocumento, body) => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoadingDocuments())

            const resp = await juetaenoApi.put(`/files/${nroDocumento}`, {
                nroDocumento  : body.nroDocumento,
                tipoDocumento : body.tipoDocumento,
                descripcion   : body.descripcion,
                destino       : body.destino,
            },
            {
                headers : {
                    'Authorization' : mToken
                },
                
            });
            dispatch(setRequestStatus({requestStatus : resp.status}))   
        } catch (error) {
            console.log(error);            
        }
    }
}