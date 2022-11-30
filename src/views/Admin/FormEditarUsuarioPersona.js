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
import { editarUsuarioAsync,
         getUsuarioPorIdAsync }              from "../../store/slices/usuarios/thunks";
import { DateTime }                          from "luxon";
import { editarPersonaAsync }                from "../../store/slices/personas/thunks";
import { verificarTokenAsync }               from "../../store/slices/jwt/thunks";
import AlertDialog                           from "../../components/Alert";
import AlertDialogSlide                      from "../../components/Dialog";
import SimpleBackdrop                        from "../../components/Backdrop";
import desencriptarUsuario                   from "../../helpers/Desencriptador";
import obtenerEdadPorFecha                   from "../../helpers/ObtenerEdadPorFecha";

const mainFeaturedPost = {
  area : "Administrador - Editar Usuario",
};
const area = [
  { label : "LEGALES" },
  { label : "MIEMBROS" },
  { label : "MESAENTRADA" },
  { label : "ADMIN" },
];
const rol           = [{ label: "USUARIO" }, { label: "ADMIN" }];
const tipoDocumento = [{ label: "DNI" }, { label: "LC" }];
const route         = "/admin";

export default function FormEditarUsuarioPersona() {

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


  const [inputValue, setInputValue] = useState({
    Area          : "",
    Rol           : "",
    TipoDocumento : "",
  });

  const areaChange = (event, newArea) => {
    setInputValue({ ...inputValue, Area: newArea });
  };

  const rolChange = (event, newRol) => {
    setInputValue({ ...inputValue, Rol: newRol });
  };

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

  const handleSubmit = (event) => {
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
      idPersona       : usuario.idPersona,
      nombre          : data.get("nombre").trim(),
      apellido        : data.get("apellido").trim(),
      fechaNacimiento : DateTime.fromISO(data.get("fecha")).toFormat("dd/LL/yyyy"),
      nroTelefono     : data.get("telefono").trim(),
    };

    const bodyUsuario = {
      idUsuario  : idUsuario,
      usuario    : data.get("usuario").trim(),
      email      : data.get("mail").trim(),
      area       : inputValue.Area,
      rolEditado : inputValue.Rol,
    };

    dispatch(editarPersonaAsync(bodyPersona))
      .then(() => dispatch(editarUsuarioAsync(bodyUsuario)))
      .then((resp) => {

        if (resp.payload.status === 200) {
          setAlertMessage({
            type    : "success",
            title   : "Exito",
            message : "Los datos de la persona fueron editados con exito",
          });
          setOpenAlert(true);

          if(desencriptarUsuario(localStorage.getItem("usuario").replaceAll('"', ''),  localStorage.getItem("token").replaceAll('"', '')).usuario.toLowerCase() === bodyUsuario.usuario.toLowerCase()) {
            localStorage.clear()
            window.location.reload()
          }

        } else if (resp.payload.response.status === 400) {
          setAlertMessage({
            type    : "error",
            title   : "Error",
            message : "Error al editar usuario por favor revise los datos",
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
                  <div style={{ height: 900, width: "100%" }}>
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
                        Datos del Usuario
                      </Typography>
                    </Paper>
                    <Box p={1} pt={3} pb={3}>
                      <Stack spacing={2}>
                        <TextField
                          fullWidth
                          label        = "Usuario"
                          id           = "usuario"
                          name         = "usuario"
                          margin       = "dense"
                          defaultValue = {usuario.usuario}
                          inputProps   = {
                            {
                              readOnly : true
                            }
                          }
                        />
                        <TextField
                          fullWidth
                          label        = "Mail"
                          id           = "mail"
                          name         = "mail"
                          margin       = "dense"
                          defaultValue = {usuario.email}
                        />
                        <Autocomplete
                          disablePortal
                          fullWidth
                          id            = "area"
                          onInputChange = {areaChange}
                          options       = {area}
                          inputValue    = {inputValue.Area}
                          defaultValue  = {usuario.area.toUpperCase()}
                          renderInput   = {(params) => (
                            <TextField {...params} label="Area" />
                          )}
                        />
                        <Autocomplete
                          disablePortal
                          fullWidth
                          id            = "rol"
                          onInputChange = {rolChange}
                          options       = {rol}
                          defaultValue  = {usuario.rol.toUpperCase()}
                          inputValue    = {inputValue.Rol}
                          renderInput   = {(params) => (
                            <TextField {...params} label="Rol" />
                          )}
                        />
                      </Stack>
                    </Box>
                    <Divider />
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
                        Datos Personales
                      </Typography>
                    </Paper>
                    <Box p={1} pt={3} pb={3}>
                      <Stack spacing={2}>
                        <TextField
                          fullWidth
                          label        = "Nombre"
                          id           = "nombre"
                          name         = "nombre"
                          margin       = "dense"
                          defaultValue = {usuario.nombre}
                        />
                        <TextField
                          fullWidth
                          label        = "Apellido"
                          id           = "apellido"
                          name         = "apellido"
                          margin       = "dense"
                          defaultValue = {usuario.apellido}
                        />
                        <Autocomplete
                          disablePortal
                          fullWidth
                          id            = "tipoDocumento"
                          inputValue    = {inputValue.TipoDocumento}
                          onInputChange = {tipoDocumentoChange}
                          options       = {tipoDocumento}
                          defaultValue  = {usuario.tipoDocumento}
                          renderInput   = {(params) => (
                            <TextField {...params} label="Tipo de Documento" />
                          )}
                          disabled
                        />
                        <TextField
                          fullWidth
                          label        = "Nº Documento"
                          id           = "ndocumento"
                          name         = "ndocumento"
                          margin       = "dense"
                          defaultValue = {usuario.nroDocumento}
                          disabled
                        />
                        <TextField
                          id              = "fecha"
                          name            = "fecha"
                          label           = "Fecha de Nacimiento"
                          type            = "date"
                          fullWidth 
                          margin          = "dense"
                          InputLabelProps = {{
                            shrink: true,
                          }}
                          defaultValue    = {DateTime.fromFormat(usuario.fechaNacimiento,"dd/LL/yyyy").toISODate()}
                        />
                        <TextField
                          fullWidth
                          label        = "Telefono"
                          id           = "telefono"
                          name         = "telefono"
                          margin       = "dense"
                          defaultValue = {usuario.telefono}
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
        openPopup          ={openPopup}
        setOpenPopup       ={setOpenPopup}
        route              ={route}
        content            ={dialogMessage}
      />
      <Footer />
    </React.Fragment>
  );
}
