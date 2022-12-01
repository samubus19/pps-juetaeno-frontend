import MainFeaturedPost                      from "../../../components/MainFeaturedPost";
import Footer                                from "../../../components/Footer";
import React, { useState }                   from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import Box                                   from "@mui/system/Box";
import TextField                             from "@mui/material/TextField";
import Paper                                 from "@mui/material/Paper";
import Autocomplete                          from "@mui/material/Autocomplete";
import { Stack }                             from "@mui/system";
import { useDispatch, useSelector }          from "react-redux";
import { crearNuevoUsuarioAsync }            from "../../../store/slices/usuarios";
import { useEffect }                         from "react";
import { verificarTokenAsync }               from "../../../store/slices/jwt/thunks";
import AlertDialog                           from "../../../components/Alert";
import AlertDialogSlide                      from "../../../components/Dialog";
import desencriptarUsuario                   from "../../../helpers/Desencriptador";

const mainFeaturedPost = {
  area: `Administrador - Nuevo Usuario `,
};

const area = [
  { label : "LEGALES" },
  { label : "MIEMBROS" },
  { label : "MESAENTRADA" },
  { label : "ADMIN" },
];

const rol   = [{ label: "USUARIO" }, { label: "ADMIN" }];
const route = "/admin";

export default function FormDatosUsuario() {
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

  const [openPopup, setPopup]             = useState(false);
  const setOpenPopup = (isTrue) => {
    setPopup(isTrue);
  };
  
  const persona  = useSelector((state) => state.persona.personas);
  const dispatch = useDispatch();
  
  useEffect(() => {

    dispatch(
      verificarTokenAsync(JSON.parse(localStorage.getItem("token")))
    ).then((resp) => {
      if (resp.payload.status === 403) {
        setDialogMessage({
          title    : "Su sesión ha caducado",
          message  : "Por favor vuelva a ingresar al sistema",
          expirado : true,
        });
        setPopup(true);
      }
    });
  }, []);

  const cancelar = () => {
    
    setDialogMessage({
      title     : "¿Desea cancelar la operación?",
      message   : "Si cancela la operación los cambios se perderán y será redirigido al inbox",
      eliminado : true,
      idPersona : persona.persona._id
    });
    setPopup(true);
  };

  const [inputValue, setInputValue] = useState({
    Area : "",
    Rol  : "",
  });

  const areaChange = (event, newArea) => {
    setInputValue({ ...inputValue, Area: newArea });
  };

  const rolChange = (event, newRol) => {
    setInputValue({ ...inputValue, Rol: newRol });
  };
    const completeFromAlert = () => {
    setAlertMessage({
      type    : "warning",
      title   : "Advertencia",
      message : "Debe completar todos los campos obligatorios",
    });
    setOpenAlert(true);
  };

  const handleSubmit = async (event) => {
    try {

      event.preventDefault();
      const data = new FormData(event.currentTarget);

      if (!data.get("usuario") || data.get("usuario") === "") {
        completeFromAlert();
        return;
      }
      if (!data.get("mail") || data.get("mail") === "") {
        completeFromAlert();
        return;
      }
      if (!inputValue.Area || inputValue.Area === "") {
        completeFromAlert();
        return;
      }
      if (!data.get("contrasenia") || data.get("contrasenia") === "") {
        completeFromAlert();
        return;
      }

      const bodyUsuario = {
        usuario     : data.get("usuario").trim(),
        email       : data.get("mail").trim(),
        contrasenia : data.get("contrasenia").trim(),
        area        : inputValue.Area,
        rol         : desencriptarUsuario(localStorage.getItem("usuario").replaceAll('"', ''),  localStorage.getItem("token").replaceAll('"', '')).rol,
        idPersona   : persona.persona._id,
      };

      dispatch(crearNuevoUsuarioAsync(bodyUsuario)).then((resp) => {
        if (resp.payload.status === 201) {
          setAlertMessage({
            type    : "success",
            title   : "Éxito",
            message : "El usuario fue registrado con éxito",
          });
          setOpenAlert(true);

        } else if (resp.payload.response.status === 400) {
          setAlertMessage({
            type    : "error",
            title   : "Error",
            message : "Ya existe un usuario con ese nombre",
          });
          setOpenAlert(true);

        } else if (resp.payload.response.status === 500) {
          setAlertMessage({
            type    : "error",
            title   : "Error",
            message : "Hubo un problema, porfavor intente nuevamente o llame a personal técnico",
          });
          setOpenAlert(true);
        }
      });

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <MainFeaturedPost post={mainFeaturedPost} />
      <Box
        sx        = {{ flexGrow: 1 }}
        pt        = {2}
        pl        = {4}
        pr        = {4}
        component = "form"
        onSubmit  = {handleSubmit}
        noValidate
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Paper elevation={3}>
              <div style={{ height: 450, width: "100%" }}>
                <Paper
                  component = "form"
                  elevation = {0}
                  sx        = {{
                    p          : "2px 4px",
                    display    : "flex",
                    alignItems : "center",
                    width      : "100%",
                    height     : 47,
                  }}
                >
                  <Typography variant="h6" p={1}>
                    Datos del Usuario
                  </Typography>
                </Paper>
                <Divider></Divider>
                <Box p={1} pt={3} pb={3}>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label  = "Usuario"
                      id     = "usuario"
                      name   = "usuario"
                      margin = "dense"
                    />
                    <TextField
                      fullWidth
                      label  = "Mail"
                      id     = "mail"
                      name   = "mail"
                      margin = "dense"
                    />
                    <TextField
                      fullWidth
                      label  = "Contraseña"
                      id     = "constrasenia"
                      name   = "contrasenia"
                      margin = "dense"
                    />
                    <Autocomplete
                      disablePortal
                      fullWidth
                      id            = "area"
                      onInputChange = {areaChange}
                      options       = {area}
                      renderInput   = {(params) => (
                        <TextField {...params} label="Área" />
                      )}
                    />
                    <Autocomplete
                      disablePortal
                      fullWidth
                      id            = "rol"
                      onInputChange = {rolChange}
                      options       = {rol}
                      renderInput   = {(params) => (
                        <TextField {...params} label="Rol" />
                      )}
                    />
                  </Stack>
                </Box>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Paper elevation={3}>
              <Box sx={{ height: 350, width: "100%" }}>
                <Paper
                  component = "form"
                  elevation = {0}
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
      <AlertDialog
        openAlert          = {openAlert}
        setOpenAlertDialog = {setOpenAlertDialog}
        content            = {alertMessage}
        route              = {route}
      />
      <AlertDialogSlide
        openPopup    = {openPopup}
        setOpenPopup = {setOpenPopup}
        route        = {route}
        content      = {dialogMessage}
      />
      <Footer />
    </React.Fragment>
  );
}
