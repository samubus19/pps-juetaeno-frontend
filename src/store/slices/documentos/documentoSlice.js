import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading         : false,
  documentos        : [],
  showDocumentos    : [],
  requestStatus     : 0,
  requestNewStatus  : 0,
  requestEditStatus : 0,
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
})

// Action creators are generated for each case reducer function
export const { startLoadingDocuments, setDocuments, setRequestStatus, setShowDocuments } = documentoSlice.actions
