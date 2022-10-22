import { juetaenoApi } from '../../../api/juetaeno-backend-api';
import { setDocuments, setRequestStatus, startLoadingDocuments } from './documentoSlice';

const mToken = localStorage.getItem("token")

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
            
            dispatch(setDocuments({documentos : resp.data}))
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