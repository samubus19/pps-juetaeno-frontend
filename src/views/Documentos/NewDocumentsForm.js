import MainFeaturedPost from "../../components/MainFeaturedPost";
import Footer from "../../components/Footer";
import React, { useState } from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { crearNuevoDocumento } from "../../store/slices/documentos/thunks";

const mainFeaturedPost = {
  area: "Area: Mesa de entrada - Nuevo Documento",
};
const tiposDocumento = [
  { label: "EXP (expediente)" },
  { label: "NO (notas)" },
  { label: "REC (reclamos)" },
  { label: "CES (ceses)" },
];

export default function NewDocumentsFrom() {
  const { isLoading, requestNewStatus } = useSelector((state) => state.documento);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openPopup, setPopup] = useState(false);

  const [inputValue, setInputValue] = useState({
    tipoDocumento: "",
  });
  const tipoDocumentoChange = (event, newTipoDocumento) => {
    setInputValue({ ...inputValue, tipoDocumento: newTipoDocumento });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      if (!inputValue.tipoDocumento || inputValue.tipoDocumento === "") {
        alert("Debe completar todos los campos olbigatorios");
        return;
      }
      if (!data.get("numeroDoc") || data.get("numeroDoc") === "") {
        alert("Debe completar todos los campos olbigatorios");
        return;
      }
      if (!data.get("description") || data.get("description") === "") {
        alert("Debe completar todos los campos olbigatorios");
        return;
      }

      const bodyNuevoDocumento = {
        tipoDocumento: inputValue.tipoDocumento.split(" ")[0].trim(),
        nroDocumento: data.get("numeroDoc").trim(),
        descripcion: data.get("description").trim(),
      };

      dispatch(crearNuevoDocumento(bodyNuevoDocumento));
    } catch (error) {
      console.log(error);
    }
  };
  useBeforeunload(()=>"reload")
  
  try {
    if (requestNewStatus === 201) {
      navigate("/mesaentrada");
    }
  } catch (error) {
    console.log(error);
  }

 
 const setOpenPopup =(isTrue) =>{
    setPopup(isTrue)
 }
 const cancel = () =>{
  setPopup(true)
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
              <div style={{ height: 400, width: "100%" }}>
                <Paper
                  component="form"
                  elevation={0}
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: 47,
                  }}
                >
                  <Typography variant="h6" p={1}>
                    Nuevo Documento - Datos
                  </Typography>
                </Paper>
                <Divider />
                <Box p={1} pt={3}>
                  <Stack spacing={2}>
                    <Autocomplete
                      disablePortal
                      id="typeDoc"
                      name="typeDoc"
                      inputValue={inputValue.tipoDocumento}
                      onInputChange={tipoDocumentoChange}
                      fullWidth
                      options={tiposDocumento}
                      renderInput={(params) => (
                        <TextField {...params} label="Tipo de documento" />
                      )}
                    />
                    <TextField
                      fullWidth
                      required
                      id="numeroDoc"
                      label="Numero de documento"
                      name="numeroDoc"
                      margin="dense"
                    />
                    <TextField
                      required
                      id="description"
                      name="description"
                      label="Descripción"
                      multiline
                      rows={4}
                    />
                  </Stack>
                </Box>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Paper elevation={3}>
              <Box sx={{ height: 400, width: "100%" }}>
                <Paper
                  component="form"
                  elevation={0}
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
                    <Button type="submit" variant="contained" fullWidth>
                      Guardar
                    </Button>
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={2}>
                    <Button variant="contained" fullWidth onClick={cancel}>
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
      <AlertDialogSlide openPopup={openPopup} setOpenPopup ={setOpenPopup}/>
      <Footer />
    </React.Fragment>
  );
}