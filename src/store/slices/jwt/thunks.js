import { createAsyncThunk } from "@reduxjs/toolkit";
import { juetaenoApi }      from "../../../api/juetaeno-backend-api";
import { setRequestStatus } from "./JwtSlice";

export const verificarTokenAsync = createAsyncThunk(
  "token/verificarToken",
  async (token, { getState, dispatch }) => {
    try {

      const resp = await juetaenoApi({
        method  : "get",
        url     : `/verifyjwt`,
        headers : {
          Authorization: token,
        },
      });

      return resp;

    } catch (error) {
      dispatch(setRequestStatus({ requestStatus: error.response.status }));
      return error.response
    }
  }
);
