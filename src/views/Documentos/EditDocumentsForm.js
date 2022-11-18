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
import {
  editarDocumento,
  getDocumentos,
} from "../../store/slices/documentos/thunks";

const mainFeaturedPost = {
  area: "Area: Mesa de entrada - Editar Documento",
};
const tiposDocumento = [
  { label: "EXP (expediente)" },
  { label: "NO (notas)" },
  { label: "REC (reclamos)" },
  { label: "CES (ceses)" },
];

export default function EditDocumentsFrom() {
  const selectionId = useLocation();
  const documentId  = selectionId.state[0];
  console.log(documentId)
  const {
    showDocumentos = [],
    isLoading,
    requestStatus,
  } = useSelector((state) => state.documento);

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

      const bodyEditarDocumento = {
        _id: documentId,
        tipoDocumento: inputValue.tipoDocumento.split(" ")[0].trim(),
        nroDocumento: data.get("numeroDoc").trim(),
        descripcion: data.get("description").trim(),
      };

      dispatch(editarDocumento(bodyEditarDocumento));
   
    } catch (error) {
      console.log(error);
    }
  };
 const setOpenPopup = (isTrue) => {
   setPopup(isTrue);
 };

  const cancelar = () => {
    setPopup(true);
  };
  useBeforeunload(() => "You'll lose your data!");
     try {
       if (requestEditStatus === 200) {
         navigate("/mesaentrada");
       }
     } catch (error) {
       console.log(error);
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
                      defaultValue={selectionData.state[0].tipoDocumento}
                      options={tiposDocumento}
                      renderInput={(params) => (
                        <TextField {...params} label="Tipo de documento" />
                      )}
                    />
                    <TextField
                      fullWidth
                      required
                      defaultValue={selectionData.state[0].nroDocumento}
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
                      defaultValue={selectionData.state[0].descripcion}
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
      <AlertDialogSlide openPopup={openPopup} setOpenPopup={setOpenPopup} />
      <Footer />
    </React.Fragment>
  );
}
