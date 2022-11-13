import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading     : false,
  documentos    : [],
  showDocumentos:[],
  requestStatus : 0
}

export const documentoSlice = createSlice({
  name: 'documento',
  initialState,
  reducers: {
    startLoadingDocuments: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLoading = true
    },
    setDocuments : (state, action) => {
      state.documentos    = action.payload.documentos
      state.showDocumentos = action.payload.showDocumentos;
     
    },
    setRequestStatus    : (state, action) => {
      state.isLoading     = false
      state.requestStatus = action.payload.requestStatus
    }
  },
})

// Action creators are generated for each case reducer function
export const { startLoadingDocuments, setDocuments, setRequestStatus, setShowDocuments } = documentoSlice.actions
