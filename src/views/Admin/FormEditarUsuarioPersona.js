import MainFeaturedPost from "../../components/MainFeaturedPost";
import Footer from "../../components/Footer";
import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";
import { Stack } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editarUsuarioAsync, getUsuarioPorIdAsync } from "../../store/slices/usuarios/thunks";
import { DateTime } from "luxon";
import { editarPersonaAsync } from "../../store/slices/personas/thunks";
import { verificarTokenAsync } from "../../store/slices/jwt/thunks";
const mainFeaturedPost = {
  area: "Administrador - Editar Usuario",
};
const area = [
  { label : "LEGALES" },
  { label : "MIEMBROS" },
  { label : "MESAENTRADA" },
  { label : "ADMIN" },
];
const rol           = [{ label : "USUARIO" }, { label : "ADMIN" }];
const tipoDocumento = [{ label : "DNI" },     { label : "LC" }];

export default function FormEditarUsuarioPersona() {
  
    const dispatch      = useDispatch()
    const idUsuario     = useLocation().state[0]
    const usuario       = useSelector(state => state.usuario.usuario)
    const isLoading     = useSelector(state => state.usuario.isLoading)
    const requestStatus = useSelector(state => state.usuario.requestStatus)
    
    useEffect(() => {
      dispatch(verificarTokenAsync(JSON.parse(localStorage.getItem("token"))));
      dispatch(getUsuarioPorIdAsync(idUsuario))
    }, []);
    
    const navigate = useNavigate(); 
  
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
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const bodyPersona = {
      idPersona       : usuario.idPersona,
      nombre          : data.get("nombre"),
      apellido        : data.get("apellido"),
      fechaNacimiento : DateTime.fromISO(data.get("fecha")).toFormat('dd/LL/yyyy'),
      nroTelefono     : data.get("telefono"),
    }

    const bodyUsuario = {
      idUsuario     : idUsuario,
      usuario       : data.get("usuario"),
      email         : data.get("mail"),
      area          : inputValue.Area,
      rolEditado    : inputValue.Rol
    }

    dispatch(editarPersonaAsync(bodyPersona))
      .then(() => dispatch(editarUsuarioAsync(bodyUsuario)))
      .then(() => {if(requestStatus === 200){alert("Usuario editado exitosamente")}})
      .then(() => navigate('/admin'))
    
  };

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
              <div style={{ height: 900, width: "100%" }}>
              
                  {
                    
                    Object.entries(usuario).length === 0 ? (
                      <div><p>Cargando datos...</p></div>
                    ) : (
                      <>
                        <Paper
                          component="form"
                          sx={{
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
                              label="Usuario"
                              id="usuario"
                              name="usuario"
                              margin="dense"
                              defaultValue={usuario.usuario}
                            />
                            <TextField
                              fullWidth
                              label="Mail"
                              id="mail"
                              name="mail"
                              margin="dense"
                              defaultValue={usuario.email}
                            />
                            <Autocomplete
                              disablePortal
                              fullWidth
                              id="area"
                              onInputChange={areaChange}
                              options={area}
                              inputValue={inputValue.Area}
                              defaultValue={usuario.area.toUpperCase()}
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
                              defaultValue={usuario.rol.toUpperCase()}
                              inputValue={inputValue.Rol}
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
                              // defaultValue={usuario.nombre}
                              defaultValue={usuario.nombre}
                            />
                            <TextField
                              fullWidth
                              label="Apellido"
                              id="apellido"
                              name="apellido"
                              margin="dense"
                              defaultValue={usuario.apellido}
                            />
                            <Autocomplete
                              disablePortal
                              fullWidth
                              id="tipoDocumento"
                              inputValue={inputValue.TipoDocumento}
                              onInputChange={tipoDocumentoChange}
                              options={tipoDocumento}
                              defaultValue={usuario.tipoDocumento}
                              renderInput={(params) => (
                                <TextField {...params} label="Tipo de Documento" />
                              )}
                              disabled
                            />
                            <TextField
                              fullWidth
                              label="Nº Documento"
                              id="ndocumento"
                              name="ndocumento"
                              margin="dense"
                              defaultValue={usuario.nroDocumento}
                              disabled
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
                              defaultValue={DateTime.fromFormat(usuario.fechaNacimiento, 'dd/LL/yyyy').toISODate()}
                            />
                            <TextField
                              fullWidth
                              label="Telefono"
                              id="telefono"
                              name="telefono"
                              margin="dense"
                              defaultValue={usuario.telefono}
                            />
                          </Stack>
                        </Box>    
                      </>
                    )
                  }
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
