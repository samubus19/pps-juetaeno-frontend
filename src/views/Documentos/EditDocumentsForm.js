import MainFeaturedPost                      from "../../components/MainFeaturedPost";
import Footer                                from "../../components/Footer";
import React, { useEffect, useState }        from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import Box                                   from "@mui/system/Box";
import TextField                             from "@mui/material/TextField";
import Paper                                 from "@mui/material/Paper";
import Autocomplete                          from "@mui/material/Autocomplete";
import { Stack }                             from "@mui/system";
import { useLocation }                       from "react-router-dom";
import { useDispatch }                       from "react-redux";
import { editarDocumento }                   from "../../store/slices/documentos/thunks";
import AlertDialogSlide                      from "../../components/Dialog";
import { verificarTokenAsync }               from "../../store/slices/jwt/thunks";
import AlertDialog                           from "../../components/Alert";
import SimpleBackdrop                        from "../../components/Backdrop";

const mainFeaturedPost = {
  area : "Área: Mesa de entrada - Editar Documento",
};

const tiposDocumento = [
  { label : "EXP (expediente)" },
  { label : "NO (notas)" },
  { label : "REC (reclamos)" },
  { label : "CES (ceses)" },
];

const route = "/mesaentrada";

export default function EditDocumentsFrom() {
  const selectionRow                    = useLocation();
  const dispatch                        = useDispatch();
  const [openPopup, setPopup]           = useState(false);
  const selectionData                   = selectionRow.state[0];
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

  const cancelar = () => {
    setDialogMessage({
      title   : "¿Desea cancelar la operación?",
      message :
        "Si cancela la operación los cambios se perderán y será redirigido al inbox",
    });
    setPopup(true);
  };

  const [inputValue, setInputValue] = useState({
    tipoDocumento : "",
  });

  const tipoDocumentoChange = (event, newTipoDocumento) => {
    setInputValue({ ...inputValue, tipoDocumento: newTipoDocumento });
  };

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

  const completeFromAlert = () => {
    setAlertMessage({
      type    : "warning",
      title   : "Advertencia",
      message : "Debe completar todos los campos obligatorios",
    });
    setOpenAlert(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      if (!inputValue.tipoDocumento || inputValue.tipoDocumento === "") {
        completeFromAlert();
        return;
      }
      if (!data.get("numeroDoc") || data.get("numeroDoc") === "") {
        completeFromAlert();
        return;
      }
      if (!data.get("description") || data.get("description") === "") {
        completeFromAlert();
        return;
      }

      const bodyEditarDocumento = {
        _id           : selectionData._id,
        tipoDocumento : inputValue.tipoDocumento.split(" ")[0].trim(),
        nroDocumento  : data.get("numeroDoc").trim(),
        descripcion   : data.get("description").trim(),
      };

      dispatch(editarDocumento(bodyEditarDocumento)).then((resp) => {
        if (resp.status === 200) {
          setAlertMessage({
            type    : "success",
            title   : "Éxito",
            message : "El documento se ha editado correctamente",
          });
          setOpenAlert(true);

        } else if (resp.response.status === 500) {
            setAlertMessage({
              type    : "error",
              title   : "Error",
              message : "Inténtelo más tarde o llame a personal técnico. ",
            });
            setOpenAlert(true);
        } else if (resp.response.status === 400) {
            setAlertMessage({
              type    : "error",
              title   : "Error",
              message : "Los datos ingresados coinciden con el de un documento existente. ",
            });
            setOpenAlert(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const setOpenPopup = (isTrue) => {
    setPopup(isTrue);
  };

  

  return (
    <React.Fragment>
      <MainFeaturedPost post={mainFeaturedPost} />
      {selectionData.length === 0 ? (
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
                  <div style={{ height: 400, width: "100%" }}>
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
                        Nuevo Documento - Datos
                      </Typography>
                    </Paper>
                    <Divider />
                    <Box p={1} pt={3}>
                      <Stack spacing={2}>
                        <Autocomplete
                          disablePortal
                          id            ="typeDoc"
                          name          ="typeDoc"
                          inputValue    ={inputValue.tipoDocumento}
                          onInputChange ={tipoDocumentoChange}
                          fullWidth
                          defaultValue  ={selectionData.tipoDocumento}
                          options       ={tiposDocumento}
                          renderInput   ={(params) => (
                            <TextField {...params} label="Tipo de documento" />
                          )}
                        />
                        <TextField
                          fullWidth
                          required
                          defaultValue={selectionData.nroDocumento}
                          id     ="numeroDoc"
                          label  ="Número"
                          name   ="numeroDoc"
                          margin ="dense"
                        />
                        <TextField
                          required
                          id           = "description"
                          name         = "description"
                          label        = "Descripción"
                          defaultValue = {selectionData.descripcion}
                          rows         = {4}
                          multiline
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
                        <Button type="submit" variant="contained" fullWidth>
                          Guardar
                        </Button>
                      </Grid>
                      <Grid item xs={1} />
                      <Grid item xs={2}>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={cancelar}
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
