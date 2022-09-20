import MainFeaturedPost from "../components/MainFeaturedPost";
import Footer from "../components/Footer";
import React from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";
import { Stack } from "@mui/system";

const mainFeaturedPost = {
  area: "Administrador - Nuevo Usuario",
};
const tipoDocumento = [
  { label: "EXP (expediente)" },
  { label: "NO (notas)" },
  { label: "REC (reclamos)" },
  { label: "CES (ceses)" },
];
export default function NewUsersFrom() {
  return (
    <React.Fragment>
      <MainFeaturedPost post={mainFeaturedPost} />

      <Box sx={{ flexGrow: 1 }} pt={2} pl={4} pr={4}>
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
                      margin="dense"
                    />
                    <TextField
                      fullWidth
                      label="Mail"
                      id="mail"
                      margin="dense"
                    />
                    <TextField
                      fullWidth
                      label="Contraseña"
                      id="constrasenia"
                      margin="dense"
                    />
                    <Autocomplete
                      disablePortal
                      fullWidth
                      id="combo-box-demo"
                      options={tipoDocumento}
                      renderInput={(params) => (
                        <TextField {...params} label="Area" />
                      )}
                    />
                    <Autocomplete
                      disablePortal
                      fullWidth
                      id="combo-box-demo"
                      options={tipoDocumento}
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
                      margin="dense"
                    />
                    <TextField
                      fullWidth
                      label="Apellido"
                      id="apellido"
                      margin="dense"
                    />
                    <Autocomplete
                      disablePortal
                      fullWidth
                      id="combo-box-demo"
                      options={tipoDocumento}
                      renderInput={(params) => (
                        <TextField {...params} label="Tipo de Documento" />
                      )}
                    />
                    <TextField
                      fullWidth
                      label="Nº Documento"
                      id="ndocumento"
                      margin="dense"
                    />
                    <TextField
                      id="fecha"
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
                      margin="dense"
                    />
                  </Stack>
                </Box>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Paper elevation={3} >
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
                    <Button variant="contained" fullWidth>
                      Guardar
                    </Button>
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={2}>
                    <Button variant="contained" fullWidth>
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
