import MainFeaturedPost                           from "../components/MainFeaturedPost";
import Footer                                     from "../components/Footer";
import React, { useState }                        from "react";
import { Button, Divider, Grid, Typography }      from "@mui/material";
import Box                                        from "@mui/system/Box";
import TextField                                  from "@mui/material/TextField";
import Paper                                      from "@mui/material/Paper";
import Autocomplete                               from "@mui/material/Autocomplete";
import { Stack }                                  from "@mui/system";
import { useNavigate }                            from "react-router-dom";
import { useDispatch, useSelector }               from "react-redux";
import { crearNuevaPersona, getPersonaPorNumero } from '../store/slices/personas';
import { crearNuevoUsuario }                      from '../store/slices/usuarios';
import { DateTime, luxon }                                  from 'luxon';
import { useEffect } from "react";

const mainFeaturedPost = {
  area: "Administrador - Nuevo Usuario",
};
const area = [
  { label: "LEGALES" },
  { label: "MIEMBROS" },
  { label: "MESAENTRADA" },
  { label: "ADMIN" },
];
const rol = [{ label: "USUARIO" }, { label: "ADMIN" }];
const tipoDocumento = [{ label: "DNI" }, { label: "LC" }];
export default function NewUsersFrom() {
  
  const { personas, isLoading } = useSelector((state) => state.persona);
  const dispatch     = useDispatch();
  const navigate     = useNavigate();
  
  const [inputValue, setInputValue] = useState({
    Area: "",
    Rol: "",
    TipoDocumento: "",
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
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      
      const bodyPersona = {
        nombre          : data.get("nombre"),
        apellido        : data.get("apellido"),
        tipoDocumento   : inputValue.TipoDocumento,
        nroDocumento    : data.get("ndocumento"),
        fechaNacimiento : DateTime.fromISO(data.get("fecha")).toFormat('dd/LL/yyyy'),
        nroTelefono     : data.get("telefono"),
      }

      const bodyUsuario = {
        usuario         : data.get("usuario"),
        email           : data.get("mail"),
        contrasenia     : data.get("contrasenia"),
        area            : inputValue.Area,
        rol             : JSON.parse(localStorage.getItem("usuario")).rol,
        fkPersona       : bodyPersona.nroDocumento
      }

      dispatch(crearNuevaPersona(bodyPersona))
      dispatch(crearNuevoUsuario(bodyUsuario))
    } catch (error) {
      console.log(error)
    }
   
  }
  return (
    <React.Fragment>
      <MainFeaturedPost post={mainFeaturedPost} />

      <Box
        sx={{ flexGrow: 1 }}
        pt={2}
        pl={4}
        pr={4}
        component="form"
        noValidate
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Paper elevation={3}>
              <div style={{ height: 1000, width: "100%" }}>
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: 47,
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
                      label="Usuario"
                      id="usuario"
                      name="usuario"
                      margin="dense"
                    />
                    <TextField
                      fullWidth
                      label="Mail"
                      id="mail"
                      name="mail"
                      margin="dense"
                    />
                    <TextField
                      fullWidth
                      label="Contraseña"
                      id="constrasenia"
                      name="contrasenia"
                      margin="dense"
                    />
                    <Autocomplete
                      disablePortal
                      fullWidth
                      id="area"
                      onInputChange={areaChange}
                      options={area}
                      renderInput={(params) => (
                        <TextField {...params} label="Area" />
                      )}
                    />
                    <Autocomplete
                      disablePortal
                      fullWidth
                      id="rol"
                      onInputChange={rolChange}
                      options={rol}
                      renderInput={(params) => (
                        <TextField {...params} label="Rol" />
                      )}
                    />
                  </Stack>
                </Box>
                <Divider />
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: 47,
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
                      label="Nombre"
                      id="nombre"
                      name="nombre"
                      margin="dense"
                    />
                    <TextField
                      fullWidth
                      label="Apellido"
                      id="apellido"
                      name="apellido"
                      margin="dense"
                    />
                    <Autocomplete
                      disablePortal
                      fullWidth
                      id="tipoDocumento"
                      inputValue={inputValue.TipoDocumento}
                      onInputChange={tipoDocumentoChange}
                      options={tipoDocumento}
                      renderInput={(params) => (
                        <TextField {...params} label="Tipo de Documento" />
                      )}
                    />
                    <TextField
                      fullWidth
                      label="Nº Documento"
                      id="ndocumento"
                      name="ndocumento"
                      margin="dense"
                    />
                    <TextField
                      id="fecha"
                      name="fecha"
                      label="Fecha de Nacimiento"
                      type="date"
                      fullWidth
                      margin="dense"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Telefono"
                      id="telefono"
                      name="telefono"
                      margin="dense"
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
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: 47,
                  }}
                >
                  <Typography variant="h6" p={1}>
                    Opciones:
                  </Typography>
                </Paper>
                <Divider />
                <Grid
                  container
                  spacing={3}
                  columns={1}
                  direction="column"
                  justifyContent="center"
                  p={3}
                >
                  <Grid item xs={1} />
                  <Grid item xs={2}>
                    <Button variant="contained" fullWidth type="sumbit">
                      Guardar
                    </Button>
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        navigate("/admin");
                      }}
                    >
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
      <Footer />
    </React.Fragment>
  );
}
