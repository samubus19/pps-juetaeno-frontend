import { createAsyncThunk } from '@reduxjs/toolkit';
import { juetaenoApi }      from '../../../api/juetaeno-backend-api';
import { setRequestStatus } from './JwtSlice';

export const verificarTokenAsync =  createAsyncThunk("token/verificarToken", async (token, {getState, dispatch}) => {
  try {
      
    const resp = await juetaenoApi(
      {
        method  : "get",
        url     : `/verifyjwt`,
        headers : {
          "Authorization" : token
        }
      })
    const result = {
      data : {
        valido : resp.data.valido
      },
      status   : resp.status
    }
    return result

  } catch (error) {
    dispatch(setRequestStatus({ requestStatus: error.response.status }));
    console.log(error);
  }
});
    