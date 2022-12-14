import React, { useEffect, useState }  from "react";
import MainFeaturedPost                from "../../components/MainFeaturedPost";
import Footer                          from "../../components/Footer";
import TabPanel                        from "../../components/TabPanel";
import { renderCellExpand }            from "../../components/CellExpand";
import { upperFormatearArea }          from "../../helpers/Area-UpperFormater";
import { getDocumentos, 
         actualizarEstadoDocumento, }  from "../../store/slices/documentos";
import { Button, 
         Divider, 
         Grid, 
         Typography, 
         Paper, 
         Autocomplete, 
         TextField, }                  from "@mui/material";
import { Stack, Box }                  from "@mui/system";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { useNavigate }                 from "react-router-dom";
import { useDispatch, useSelector }    from "react-redux";
import { verificarTokenAsync }         from "../../store/slices/jwt/thunks";
import AlertDialog                     from "../../components/Alert";
import CircularIndeterminate           from "../../components/Circular";
import AlertDialogSlide                from "../../components/Dialog";
// en area se debe poner el nombre tal cual se guarde en el back
const area        = "Mesa de Entrada";
const estado      = [{ label: "En Pase" }];
const areaDestino = [{ label: "Legales" }, { label: "Miembros de Junta" }];
const route       = "/mesaentrada";

const columns = [
  {
    field      : "tipoDocumento",
    headerName : "Tipo ",
    width      : 130,
    renderCell : renderCellExpand,
  },
  {
    field      : "nroDocumento",
    headerName : "Número",
    width      : 130,
    renderCell : renderCellExpand,
  },
  {
    field      : "descripcion",
    headerName : "Descripción",
    width      : 200,
    renderCell : renderCellExpand,
  },
  {
    field      : "estado",
    headerName : "Estado",
    width      : 200,
    renderCell : renderCellExpand,
  },
  {
    field      : "sede",
    headerName : "Sede",
    width      : 200,
    renderCell : renderCellExpand,
  },
  {
    field      : "fechaIngresoArea",
    headerName : "Fecha de ingreso al área",
    width      : 200,
    renderCell : renderCellExpand,
  },

  {
    field      : "UsuarioFirmante",
    headerName : "Firma",
    width      : 200,
    renderCell : renderCellExpand,
  },
];

const mainFeaturedPost = {
  area : "Área: Mesa de entrada",
};

export default function MesaEntradaForm() {

  const { showDocumentos = [] } = useSelector(
    (state) => state.documento
  );

  const dispatch                        = useDispatch();
  const [value, setValue]               = React.useState(0);
  //es el id seleccionado para enviar a editar
  const [selectionId, setSelectionId]   = useState([]);
  const [selectionRow, setSelectionRow] = useState([]);
  //body para actualizar estado
  const [estadoValue, setEstadoValue]   = useState({
    estado      : "",
    areaDestino : "",
    _id         : "",
  });

  const [openAlert, setOpenAlert]       = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    type    : "",
    title   : "",
    message : "",
    reload  : false,
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

  const navigate = useNavigate();
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
    dispatch(getDocumentos());
  }, []);

  const estadoChange = (event, estado) => {
    setEstadoValue({ ...estadoValue, estado: estado });
  };

  const areaDestinoChange = (event, areaDestino) => {
    setEstadoValue({ ...estadoValue, areaDestino: areaDestino });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (!estadoValue.estado || estadoValue.estado === "") {
        alert("Debe completar todos los campos olbigatorios");
        return;
      }
      if (!estadoValue.areaDestino || estadoValue.areaDestino === "") {
        alert("Debe completar todos los campos olbigatorios");
        return;
      }
      if (!estadoValue._id || estadoValue._id === "") {
        alert("Debe completar todos los campos olbigatorios");
        return;
      }

      const bodyActualizarEstado = {
        nuevoEstado : estadoValue.estado,
        sede        : upperFormatearArea(estadoValue.areaDestino),
        _id         : estadoValue._id,
      };

      dispatch(actualizarEstadoDocumento(bodyActualizarEstado)).then((resp) => {
        if (resp.status === 200) {
          setAlertMessage({
            type    : "success",
            title   : "Éxito",
            message : "El estado del documento se ha actualizado correctamente",
            reaload : true,
          });
          setOpenAlert(true);

        } else {
          if (resp.response.status === 500) {
            setAlertMessage({
              type    : "error",
              title   : "Error",
              message : "Inténtelo más tarde o llame a personal técnico. ",
              reaload : true,
            });
            setOpenAlert(true);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <React.Fragment>
      <MainFeaturedPost post={mainFeaturedPost} />

      <Box sx={{ flexGrow: 1 }} pt={2} pl={4} pr={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Paper elevation={3}>
              <div style={{ height: 450, width: "100%", display: "grid" }}>
                {showDocumentos.length === 0 ? (
                  <CircularIndeterminate />
                ) : (
                  <>
                    <DataGrid
                      localeText={
                        esES.components.MuiDataGrid.defaultProps.localeText
                      }
                      getRowId={(r) => r._id}
                      rows={showDocumentos.filter(
                        (documento) => documento.sede === area
                      )}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      checkboxSelection
                      selectionModel={selectionId}
                      onSelectionModelChange={(selection) => {
                        if (selection.length > 1) {
                          const selectionSet = new Set(selectionId);
                          const result = selection.filter(
                            (s) => !selectionSet.has(s)
                          );
                          setSelectionId(result);
                          setEstadoValue({
                            ...estadoValue,
                            _id: result[0],
                          });
                          const selectedRow = showDocumentos.filter(
                            (documento) => documento._id === result[0]
                          );
                          setSelectionRow(selectedRow);
                        } else {
                          setSelectionId(selection);
                          setEstadoValue({
                            ...estadoValue,
                            _id: selection[0],
                          });
                          const selectedRow = showDocumentos.filter(
                            (documento) => documento._id === selection[0]
                          );
                          setSelectionRow(selectedRow);
                        }
                      }}
                      components={{ Toolbar: GridToolbar }}
                      componentsProps={{
                        toolbar: {
                          showQuickFilter: true,
                          quickFilterProps: { debounceMs: 500 },
                          csvOptions: { disableToolbarButton: true },
                          printOptions: { disableToolbarButton: true },
                        },
                      }}
                    />
                  </>
                )}
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Paper elevation={3}>
              <Box sx={{ height: 450, width: "100%" }}>
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
                <TabPanel value={value} index={0}>
                  <Divider />
                  <Grid
                    container
                    spacing={3}
                    columns={1}
                    direction="column"
                    justifyContent="center"
                    p={3}
                  >
                    <Grid item xs={2}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          navigate("/busqueda");
                        }}
                      >
                        Buscar Documento
                      </Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          navigate("/mesaentrada/nuevodocumento");
                        }}
                      >
                        Nuevo Documento
                      </Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        disabled={
                          !selectionRow.length
                            ? true
                            : selectionRow[0].estado === "Iniciado"
                            ? false
                            : true
                        }
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          navigate(`/mesaentrada/editardocumento`, {
                            state: selectionRow,
                          });
                        }}
                      >
                        Editar Documento
                      </Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        variant="contained"
                        disabled={!selectionId.length}
                        fullWidth
                        onClick={() => setValue(1)}
                      >
                        Actualizar Estado
                      </Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        disabled={!selectionRow.length}
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          navigate(`/documento/historial`, {
                            state: selectionRow,
                          });
                        }}
                      >
                        Ver historial
                      </Button>
                    </Grid>
                  </Grid>
                  
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Box p={3}>
                    <Stack spacing={2}>
                      <Autocomplete
                        disablePortal
                        fullWidth
                        id="combo-box-demo"
                        options={estado}
                        onInputChange={estadoChange}
                        renderInput={(params) => (
                          <TextField {...params} label="Estado" />
                        )}
                      />
                      <Autocomplete
                        disablePortal
                        fullWidth
                        id="combo-box-demo"
                        options={areaDestino}
                        onInputChange={areaDestinoChange}
                        renderInput={(params) => (
                          <TextField {...params} label="Área" />
                        )}
                      />
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={handleSubmit}
                      >
                        Guardar
                      </Button>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => setValue(0)}
                      >
                        Volver
                      </Button>
                    </Stack>
                  </Box>
                </TabPanel>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <AlertDialog
        openAlert={openAlert}
        setOpenAlertDialog={setOpenAlertDialog}
        route={route}
        content={alertMessage}
      />
      <AlertDialogSlide
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        content={dialogMessage}
      />
      <Footer />
    </React.Fragment>
  );
}
