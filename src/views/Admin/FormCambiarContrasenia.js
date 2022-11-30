import MainFeaturedPost                      from "../../components/MainFeaturedPost";
import Footer                                from "../../components/Footer";
import React, { useEffect, useState }        from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import Box                                   from "@mui/system/Box";
import TextField                             from "@mui/material/TextField";
import Paper                                 from "@mui/material/Paper";
import Autocomplete                          from "@mui/material/Autocomplete";
import { Stack }                             from "@mui/system";
import { useLocation, useNavigate }          from "react-router-dom";
import { useDispatch, useSelector }          from "react-redux";
import { cambiarContraseniaAsync, editarUsuarioAsync,
         getUsuarioPorIdAsync }              from "../../store/slices/usuarios/thunks";
import { DateTime }                          from "luxon";
import { editarPersonaAsync }                from "../../store/slices/personas/thunks";
import { verificarTokenAsync }               from "../../store/slices/jwt/thunks";
import AlertDialog                           from "../../components/Alert";
import AlertDialogSlide                      from "../../components/Dialog";
import SimpleBackdrop                        from "../../components/Backdrop";

const mainFeaturedPost = {
  area : "Administrador - Editar Usuario",
};

const route         = "/admin";
export default function FormCambiarContraseniaUsuario() {

  const [openAlert, setOpenAlert]       = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    type    : "",
    title   : "",
    message : "",
    reaload : false,
  });

  const setOpenAlertDialog = (isTrue) => {
    setOpenAlert(isTrue);
  };

  const [dialogMessage, setDialogMessage] = useState({
    title    : "",
    message  : "",
    expirado : false,
  });

  const [openPopup, setPopup] = useState(false);

  const setOpenPopup = (isTrue) => {
    setPopup(isTrue);
  };

  const cancelar = () => {
    setDialogMessage({
      title   : "¿Desea cancelar la operacion?",
      message : "Si cancela la operacion los cambios se perderan y sera redirigido al inbox",
    });
    setPopup(true);
  };

  const dispatch  = useDispatch();
  const idUsuario = useLocation().state[0];
  const usuario   = useSelector((state) => state.usuario.usuario);

  useEffect(() => {

    dispatch(
      verificarTokenAsync(JSON.parse(localStorage.getItem("token")))
    ).then((resp) => {
      if (resp.payload.status === 403) {
        setDialogMessage({
          title: "Su sesion ha caducado",
          message: "Por favor vuelva a ingresar al sistema",
          expirado: true,
        });
        setPopup(true);
      }
    });

    dispatch(getUsuarioPorIdAsync(idUsuario));

  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(!data.get("contrasenia") || data.get("contrasenia") === "") {
        setAlertMessage({
            type    : "error",
            title   : "Error",
            message : "Debe completar todos los campos",
          });
          setOpenAlert(true);
        return
    } 

    if(!data.get("repetirContrasenia") || data.get("repetirContrasenia") === "") {
        setAlertMessage({
            type    : "error",
            title   : "Error",
            message : "Debe completar todos los campos",
          });
          setOpenAlert(true);
        return
    }

    if(data.get("contrasenia").length < 6 || data.get("repetirContrasenia").length < 6) {
        setAlertMessage({
            type    : "error",
            title   : "Error",
            message : "La contraseña debe tener al menos 6 caracteres",
          });
          setOpenAlert(true);
        return
    }

    if(data.get("contrasenia") !== data.get("repetirContrasenia")) {
        setAlertMessage({
            type    : "error",
            title   : "Error",
            message : "Las contraseñas no coinciden",
          });
          setOpenAlert(true);
        return
    }

    const bodyCambiarContrasenia = {
      contrasenia : data.get("contrasenia"),
      idUsuario   : idUsuario
    };

    dispatch(cambiarContraseniaAsync(bodyCambiarContrasenia))
      .then((resp) => {
        console.log(resp)
        if (resp.payload.status === 200) {
          setAlertMessage({
            type    : "success",
            title   : "Éxito",
            message : "Contraseña actualizada con éxito",
          });
          setOpenAlert(true);

        } else if (resp.payload.status === 400) {
          setAlertMessage({
            type    : "error",
            title   : "Error",
            message : "Error al cambiar contraseña por favor revise los datos",
          });
          setOpenAlert(true);

        } else if (resp.payload.response.status === 500) {
          setAlertMessage({
            type    : "error",
            title   : "Error",
            message : "Hubo un problema, porfavor intente nuevamente o llame a personal tecnico",
          });
          setOpenAlert(true);
        }
      });
  };

  return (
    <React.Fragment>
      <MainFeaturedPost post={mainFeaturedPost} />
      {Object.entries(usuario).length === 0 ? (
        <SimpleBackdrop />
      ) : (
        <>
          <Box
            sx        = {{ flexGrow: 1 }}
            pt        = {2}
            pl        = {4}
            pr        = {4}
            component = "form"
            noValidate
            onSubmit  = {handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <Paper elevation={3}>
                  <div style={{ height: 240, width: "100%" }}>
                    <Paper
                      component = "form"
                      sx        = {{
                        p          : "2px 4px",
                        display    : "flex",
                        alignItems : "center",
                        width      : "100%",
                        height     : 47,
                      }}
                    >
                      <Typography variant="h6" p={1}>
                        Cambiar contraseña
                      </Typography>
                    </Paper>
                    <Box p={1} pt={3} pb={3}>
                      <Stack spacing={2}>
                        <TextField
                          fullWidth
                          label        = "Contraseña *"
                          id           = "contrasenia"
                          name         = "contrasenia"
                          margin       = "dense"
                        />
                        <TextField
                          fullWidth
                          label        = "Repetir contraseña *"
                          id           = "repetirContrasenia"
                          name         = "repetirContrasenia"
                          margin       = "dense"
                        />
                      </Stack>
                    </Box>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <Paper elevation={3}>
                  <Box sx={{ height: 240, width: "100%" }}>
                    <Paper
                      component = "form"
                      sx        = {{
                        p          : "2px 4px",
                        display    : "flex",
                        alignItems : "center",
                        width      : "100%",
                        height     : 47,
                      }}
                    >
                      <Typography variant="h6" p={1}>
                        Opciones:
                      </Typography>
                    </Paper>
                    <Divider />
                    <Grid
                      container
                      spacing        = {3}
                      columns        = {1}
                      direction      = "column"
                      justifyContent = "center"
                      p              = {3}
                    >
                      <Grid item xs={1} />
                      <Grid item xs={2}>
                        <Button variant="contained" fullWidth type="sumbit">
                          Guardar
                        </Button>
                      </Grid>
                      <Grid item xs={1} />
                      <Grid item xs={2}>
                        <Button variant="contained" fullWidth onClick={cancelar}>
                          Cancelar
                        </Button>
                      </Grid>
                      <Grid item xs={1} />
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      <AlertDialog
        openAlert          = {openAlert}
        setOpenAlertDialog = {setOpenAlertDialog}
        route              = {route}
        content            = {alertMessage}
      />
      <AlertDialogSlide
        openPopup          = {openPopup}
        setOpenPopup       = {setOpenPopup}
        route              = {route}
        content            = {dialogMessage}
      />
      <Footer />
    </React.Fragment>
  );
}
