import MainFeaturedPost                      from "../../../components/MainFeaturedPost";
import Footer                                from "../../../components/Footer";
import React, { useEffect, useState }        from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import Box                                   from "@mui/system/Box";
import TextField                             from "@mui/material/TextField";
import Paper                                 from "@mui/material/Paper";
import Autocomplete                          from "@mui/material/Autocomplete";
import { Stack }                             from "@mui/system";
import { useNavigate }                       from "react-router-dom";
import { useDispatch }                       from "react-redux";
import { crearNuevaPersonaAsync, 
         getPersonaPorNumeroAsync,}          from "../../../store/slices/personas";
import { DateTime }                          from "luxon";
import { verificarTokenAsync }               from "../../../store/slices/jwt/thunks";
import AlertDialog                           from "../../../components/Alert";
import AlertDialogSlide                      from "../../../components/Dialog";
import obtenerEdadPorFecha                   from "../../../helpers/ObtenerEdadPorFecha";

const mainFeaturedPost = {
  area : `Administrador - Nuevo Usuario `,
};

const tipoDocumento = [{ label : "DNI" }, { label : "LC" }];

const route = "/admin";

export default function NewUsersFrom() {

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

  const cancelar = () => {
    setDialogMessage({
      title: "¿Desea cancelar la operación?",
      message:
        "Si cancela la operación los cambios se perderán y será redirigido al inbox",
    });
    setPopup(true);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    
    dispatch(
      verificarTokenAsync(JSON.parse(localStorage.getItem("token")))
    ).then((resp) => {

      if (resp.payload.status === 403) {
        setDialogMessage({
          title    : "Su sesián ha caducado",
          message  : "Por favor vuelva a ingresar al sistema",
          expirado : true,
        });
        setPopup(true);
      }
    });
  }, []);

  const [inputValue, setInputValue] = useState({
    TipoDocumento : "",
  });

  const tipoDocumentoChange = (event, newTipoDocumento) => {
    setInputValue({ ...inputValue, TipoDocumento: newTipoDocumento });
  };
    const completeFromAlert = (mensaje = "Debe completar todos los campos obligatorios") => {
    setAlertMessage({
      type    : "warning",
      title   : "Advertencia",
      message : mensaje,
    });
    setOpenAlert(true);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      if (!data.get("nombre") || data.get("nombre") === "") {
        completeFromAlert();
        return;
      }
      if (!data.get("apellido") || data.get("apellido") === "") {
        completeFromAlert();
        return;
      }
      if (!inputValue.TipoDocumento || inputValue.TipoDocumento === "") {
        completeFromAlert();
        return;
      }
      if (!data.get("ndocumento") || data.get("ndocumento") === "") {
        completeFromAlert();
        return;
      }
      if (!data.get("fecha") || data.get("fecha") === "") {
        completeFromAlert();
        return;
      } else if(obtenerEdadPorFecha(DateTime.fromISO(data.get("fecha")).toFormat("dd/LL/yyyy")) < 18){
        completeFromAlert("La persona debe ser mayor de edad (>18).")
        return
      }
      if (!data.get("telefono") || data.get("telefono") === "") {
        completeFromAlert();
        return;
      }

      const bodyPersona = {
        nombre          : data.get("nombre").trim(),
        apellido        : data.get("apellido").trim(),
        tipoDocumento   : inputValue.TipoDocumento,
        nroDocumento    : data.get("ndocumento").trim(),
        fechaNacimiento : DateTime.fromISO(data.get("fecha")).toFormat("dd/LL/yyyy"),
        nroTelefono     : data.get("telefono").trim(),
      };

      dispatch(crearNuevaPersonaAsync(bodyPersona)).then((resp) => {
        if (resp.payload.status === 201) {
          setAlertMessage({
            type    : "success",
            title   : "Exito",
            message : "Los datos de la persona fueron registrado con éxito",
          });
          setOpenAlert(true);
          if (openAlert === false) {
            setTimeout(() => {
              dispatch(getPersonaPorNumeroAsync(bodyPersona.nroDocumento)).then(
                () => navigate("/admin/nuevousuario2")
              );
            }, 4000);
          }

        } else if (resp.payload.response.status === 400) {
          setAlertMessage({
            type    : "error",
            title   : "Error",
            message :
              "La persona que se intenta registrar ya existe en la base de datos",
          });
          setOpenAlert(true);

        } else if (resp.payload.response.status === 500) {
          setAlertMessage({
            type    : "error",
            title   : "Error",
            message :
              "Hubo un problema, por favor intente nuevamente o llame a personal técnico",
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
              <div style={{ height: 510, width: "100%" }}>
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
                    Datos Personales
                  </Typography>
                </Paper>
                <Divider></Divider>
                <Box p={1} pt={3} pb={3}>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label  = "Nombre"
                      id     = "nombre"
                      name   = "nombre"
                      margin = "dense"
                    />
                    <TextField
                      fullWidth
                      label  = "Apellido"
                      id     = "apellido"
                      name   = "apellido"
                      margin = "dense"
                    />
                    <Autocomplete
                      disablePortal
                      fullWidth
                      id            = "tipoDocumento"
                      inputValue    = {inputValue.TipoDocumento}
                      onInputChange = {tipoDocumentoChange}
                      options       = {tipoDocumento}
                      renderInput   = {(params) => (
                        <TextField {...params} label="Tipo de Documento" />
                      )}
                    />
                    <TextField
                      fullWidth
                      label  ="Nº Documento"
                      id     ="ndocumento"
                      name   ="ndocumento"
                      margin ="dense"
                    />
                    <TextField
                      fullWidth
                      id              ="fecha"
                      name            ="fecha"
                      label           ="Fecha de Nacimiento"
                      type            ="date"
                      margin          ="dense"
                      InputLabelProps ={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      fullWidth
                      label  ="Teléfono"
                      id     ="telefono"
                      name   ="telefono"
                      margin ="dense"
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
                      Continuar
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
      />
      <AlertDialogSlide
        openPopup    ={openPopup}
        setOpenPopup ={setOpenPopup}
        route        ={route}
        content      ={dialogMessage}
      />
      <Footer />
    </React.Fragment>
  );
}
