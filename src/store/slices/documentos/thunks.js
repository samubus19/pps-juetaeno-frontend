import { juetaenoApi }          from "../../../api/juetaeno-backend-api";
import { setDocuments, 
        setRequestStatus, 
        startLoadingDocuments } from "./documentoSlice";
import { formatearArea }        from "../../../helpers/Area-formatter";
import desencriptarUsuario      from "../../../helpers/Desencriptador";
import { createAsyncThunk }     from "@reduxjs/toolkit"; 

const mToken = JSON.parse(localStorage.getItem("token"));

export const getDocumentos = () => {
  return async (dispatch, getState) => {
    try {
     
      dispatch(startLoadingDocuments());
      
      const resp = await juetaenoApi.get(`/files`, {
        headers: {
          Authorization: mToken,
        },
      });

      const documento = resp.data.mensaje;
      const vector    = [];

      for (let i = 0; i < documento.length; i++) {
        const e = {
          _id: documento[i]._id,
          tipoDocumento     : documento[i].tipoDocumento,
          nroDocumento      : documento[i].nroDocumento,
          descripcion       : documento[i].descripcion,
          fechaIngresoInst  : documento[i].historial[0].fechaIngreso,
          fechaIngresoArea  : documento[i].historial[documento[i].historial.length - 1].fechaIngreso,
          fechaSalida       : documento[i].historial[documento[i].historial.length - 1].fechaSalida,
          sede              : formatearArea(documento[i].historial[documento[i].historial.length - 1].sede),
          estado            : documento[i].historial[documento[i].historial.length - 1].estado,
          UsuarioFirmante   : documento[i].historial[documento[i].historial.length - 1].idUsuarioFirmante.idPersona.nombre +
            " " + documento[i].historial[documento[i].historial.length - 1].idUsuarioFirmante.idPersona.apellido +
            " DNI: " + documento[i].historial[documento[i].historial.length - 1].idUsuarioFirmante.idPersona.nroDocumento,
        };
        vector.push(e);
      }

      dispatch(
        setDocuments({ documentos: resp.data.mensaje, showDocumentos: vector })
      );
      dispatch(setRequestStatus({ requestStatus: resp.status }));
    } catch (error) {
      dispatch(setRequestStatus({ requestStatus: error.response.status }));
      console.log(error);
    }
  };
};

export const crearNuevoDocumento = (body) => {
  return async (dispatch, getState) => {
    try {

      dispatch(startLoadingDocuments());

      const resp = await juetaenoApi.post(
        `/files`,
        {
          nroDocumento      : body.nroDocumento,
          tipoDocumento     : body.tipoDocumento,
          descripcion       : body.descripcion,
          idUsuarioFirmante : desencriptarUsuario(localStorage.getItem("usuario").replaceAll('"', ''),  localStorage.getItem("token").replaceAll('"', ''))._id,
        },
        {
          headers : {
            Authorization : mToken,
          },
        }
      );
      dispatch(setRequestStatus({ requestNewStatus: resp.status }));
      return resp;

    } catch (error) {
      dispatch(setRequestStatus({ requestNewStatus: error.response.status }));
      //console.log(error.response.status);
      return error;
    }
  };
};

export const actualizarEstadoDocumento = (body) => {
  return async (dispatch, getState) => {
    try {
      const resp = await juetaenoApi.put(
        `/files/state`,
        {
          _id               : body._id,
          nuevoEstado       : body.nuevoEstado,
          sede              : body.sede,
          idUsuarioFirmante : desencriptarUsuario(localStorage.getItem("usuario").replaceAll('"', ''),  localStorage.getItem("token").replaceAll('"', ''))._id,
        },
        {
          headers : {
            Authorization : mToken,
          },
        }
      );
      dispatch(setRequestStatus({ requestStatus: resp.status }));
      return resp

    } catch (error) {
      dispatch(setRequestStatus({ requestStatus: error.response.status }));
      return error;
    }
  };
};

export const editarDocumento = (body) => {
  return async (dispatch, getState) => {
    try {

      dispatch(startLoadingDocuments());

      const resp = await juetaenoApi.put(
        `/files`,
        {
          _id           : body._id,
          nroDocumento  : body.nroDocumento,
          tipoDocumento : body.tipoDocumento,
          descripcion   : body.descripcion,
        },
        {
          headers: {
            Authorization : mToken,
          },
        }
      );
      
      return resp;

    } catch (error) {
      dispatch(setRequestStatus({ requestEditStatus: error.response.status }));
      return error;
    }
  };
};

export const getDocumentoPorIdAsync =  createAsyncThunk("documento/getDocumentoPorIdAsync", async (idDocumento, {getState, dispatch}) => {
  try {

    const resp = await juetaenoApi.get(`/files/${idDocumento}`, {
      headers: {
        Authorization: mToken,
      },
    });

    let arreglo = []

    let datosFijos = {
      tipoDocumento : resp.data.mensaje.tipoDocumento,
      nroDocumento  : resp.data.mensaje.nroDocumento,
      descripcion   : resp.data.mensaje.descripcion
    }

    resp.data.mensaje.historial.map((elementoHistorial) => {
      let datosPersona = {
        firmante : `${elementoHistorial.idUsuarioFirmante.idPersona.nombre} ${elementoHistorial.idUsuarioFirmante.idPersona.apellido } - ${elementoHistorial.idUsuarioFirmante.idPersona.tipoDocumento}: ${elementoHistorial.idUsuarioFirmante.idPersona.nroDocumento}`
      }
      delete elementoHistorial.idUsuarioFirmante
      let datosDocumento = Object.assign(datosPersona, elementoHistorial)
      
      let datosFinales = Object.assign(datosDocumento, datosFijos)
      
      arreglo.push(datosFinales)
    })

    const result = {
      data   : {
        mensaje : arreglo,
      status : resp.status
    }}
    return result

  } catch (error) {
    dispatch(setRequestStatus({ requestStatus: error.response.status }));
    return error
  }
});