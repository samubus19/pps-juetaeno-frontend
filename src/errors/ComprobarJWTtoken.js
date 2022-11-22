import { verificarTokenAsync } from "../store/slices/jwt/thunks";

export default function comprobarValidezJWT(dispatch){
    dispatch(verificarTokenAsync(JSON.parse(localStorage.getItem("token"))))
      .then((resp) => {
        if(resp.payload.status === 403) {
          alert("invalido")
          localStorage.clear();
          window.location.reload()
        }
      })
}
