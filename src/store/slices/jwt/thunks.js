import { createAsyncThunk } from "@reduxjs/toolkit";
import { juetaenoApi } from "../../../api/juetaeno-backend-api";
import { setRequestStatus, setValido } from "./JwtSlice";

export const verificarTokenAsync = createAsyncThunk(
  "token/verificarToken",
  async (token, { getState, dispatch }) => {
    try {
      const resp = await juetaenoApi({
        method: "get",
        url: `/verifyjwt`,
        headers: {
          Authorization: token,
        },
      });
      //dispatch(setValido({ valido: resp.data.valido }));
      
      /*const result = {
        data: {
          valido: resp.data.valido,
        },
        status: resp.status,
      };*/
      return resp;
     
      
    } catch (error) {
      dispatch(setRequestStatus({ requestStatus: error.response.status }));
     
      localStorage.clear();
      window.location.reload();
      //console.log(error);
    }
  }
);
