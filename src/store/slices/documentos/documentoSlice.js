import { createSlice } from '@reduxjs/toolkit'
import { getDocumentoPorIdAsync } from './thunks';

const initialState = {
  isLoading         : false,
  documentos        : [],
  showDocumentos    : [],
  requestStatus     : 0,
  requestNewStatus  : 0,
  requestEditStatus : 0,
  historial         : []
};

export const documentoSlice = createSlice({
  name: 'documento',
  initialState,
  reducers: {
    startLoadingDocuments: (state) => {
      state.isLoading = true
    },
    setDocuments : (state, action) => {
      state.documentos     = action.payload.documentos
      state.showDocumentos = action.payload.showDocumentos;
     
    },
    setRequestStatus : (state, action) => {
      state.isLoading         = false
      state.requestStatus     = action.payload.requestStatus
      state.requestEditStatus = action.payload.requestEditStatus
      state.requestNewStatus  = action.payload.requestNewStatus
    }
  },
  extraReducers : builder => {
    builder.addCase(getDocumentoPorIdAsync.fulfilled, (state,action) => {
        state.isLoading     = false
      if(action.payload.data) {
        state.historial     = action.payload.data.mensaje
        state.requestStatus = action.payload.status
      } else {
        state.requestStatus = action.payload.response.requestStatus
      }
    })
    builder.addCase(getDocumentoPorIdAsync.pending, (state, action) => {
      state.isLoading       = true
      state.historial      = []
    })  
  }
})

// Action creators are generated for each case reducer function
export const { startLoadingDocuments, setDocuments, setRequestStatus, setShowDocuments } = documentoSlice.actions
