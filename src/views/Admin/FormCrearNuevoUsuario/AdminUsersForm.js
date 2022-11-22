import MainFeaturedPost                           from "../../../components/MainFeaturedPost";
import Footer                                     from "../../../components/Footer";
import React, { useEffect, useState }                        from "react";
import { Button, Divider, Grid, Typography }      from "@mui/material";
import Box                                        from "@mui/system/Box";
import TextField                                  from "@mui/material/TextField";
import Paper                                      from "@mui/material/Paper";
import Autocomplete                               from "@mui/material/Autocomplete";
import { Stack }                                  from "@mui/system";
import { useNavigate }                            from "react-router-dom";
import { useDispatch, useSelector }               from "react-redux";
import { crearNuevaPersonaAsync, getPersonaPorNumeroAsync } from '../../../store/slices/personas';
import { DateTime}                        from 'luxon';
import { verificarTokenAsync } from "../../../store/slices/jwt/thunks";
const mainFeaturedPost = {
  area    : `Administrador - Nuevo Usuario `,
};


const tipoDocumento = [{ label: "DNI" }, { label: "LC" }];
export default function NewUsersFrom() {
  
  const persona       = useSelector((state) => state.persona.personas);
  const isLoading     = useSelector((state) => state.persona.isLoading);
  const requestStatus = useSelector((state) => state.persona.requestStatus);
  const dispatch      = useDispatch();
  const navigate      = useNavigate();
  useEffect(() => {
    dispatch(verificarTokenAsync(JSON.parse(localStorage.getItem("token"))));
  }, []);
  const [inputValue, setInputValue] = useState({
    TipoDocumento : "",
  });

  const tipoDocumentoChange = (event, newTipoDocumento) => {
    setInputValue({ ...inputValue, TipoDocumento: newTipoDocumento });
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      if(!data.get("nombre") || data.get("nombre") === ""){
        alert("Debe completar todos los campos olbigatorios");
        return
      }
      if(!data.get("apellido") || data.get("apellido") === ""){
        alert("Debe completar todos los campos olbigatorios");
        return
      }
      if(!inputValue.TipoDocumento || inputValue.TipoDocumento === ""){
        alert("Debe completar todos los campos olbigatorios");
        return
      }
      if(!data.get("ndocumento") || data.get("ndocumento") === ""){
        alert("Debe completar todos los campos olbigatorios");
        return
      }
      if(!data.get("fecha") || data.get("fecha") === ""){
        alert("Debe completar todos los campos olbigatorios");
        return
      }
      if(!data.get("telefono") || data.get("telefono") === ""){
        alert("Debe completar todos los campos olbigatorios");
        return
      }
      

      const bodyPersona = {
        nombre          : data.get("nombre"),
        apellido        : data.get("apellido"),
        tipoDocumento   : inputValue.TipoDocumento,
        nroDocumento    : data.get("ndocumento"),
        fechaNacimiento : DateTime.fromISO(data.get("fecha")).toFormat('dd/LL/yyyy'),
        nroTelefono     : data.get("telefono"),
      }

      dispatch(crearNuevaPersonaAsync(bodyPersona))
        .then(() => dispatch(getPersonaPorNumeroAsync(bodyPersona.nroDocumento)))
        .then(() => navigate('/admin/nuevousuario2'))
        
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
              <div style={{ height: 510, width: "100%" }}>
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
                      Continuar
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
