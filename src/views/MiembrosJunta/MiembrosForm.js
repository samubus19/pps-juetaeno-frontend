import React, { useEffect, useState } from "react";
import MainFeaturedPost from "../../components/MainFeaturedPost";
import Footer from "../../components/Footer";
import TabPanel from "../../components/TabPanel";
import { renderCellExpand } from "../../components/CellExpand";
import { getDocumentos, actualizarEstadoDocumento } from "../../store/slices/documentos";
import { upperFormatearArea } from "../../helpers/Area-UpperFormater";
import {
  Button,
  Divider,
  Grid,
  Typography,
  Paper,
  Autocomplete,
  TextField,
} from "@mui/material";
import { Stack, Box } from "@mui/system";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// en area se debe poner el nombre tal cual se guarde en el back
const area = "Miembros de Junta";
const estado = [{ label: "en Pase" }];
const areaDestino = [{ label: "Mesa de Entrada" }, { label: "Legales" }];

const columns = [
  {
    field: "tipoDocumento",
    headerName: "Tipo ",
    width: 130,
    renderCell: renderCellExpand,
  },
  {
    field: "nroDocumento",
    headerName: "Numero",
    width: 130,
    renderCell: renderCellExpand,
  },
  {
    field: "descripcion",
    headerName: "Descripcion",
    width: 200,
    renderCell: renderCellExpand,
  },
  {
    field: "estado",
    headerName: "Estado",
    width: 200,
    renderCell: renderCellExpand,
  },
  {
    field: "sede",
    headerName: "Sede",
    width: 200,
    renderCell: renderCellExpand,
  },
  {
    field: "fechaIngreso",
    headerName: "Fecha de Ingreso",
    width: 200,
    renderCell: renderCellExpand,
  },

  {
    field: "UsuarioFirmante",
    headerName: "Firma",
    width: 200,
    renderCell: renderCellExpand,
  },
];

const mainFeaturedPost = {
  area: "Area: Miembros de Junta",
};

export default function MiembrosForm() {
  const { showDocumentos = [], requestStatus } = useSelector((state) => state.documento);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  //es el id seleccionado
  const [selectionId, setSelectionId] = useState([]);
  //body para actualizar estado
  const [estadoValue, setEstadoValue] = useState({
    estado: "",
    areaDestino: "",
    _id: "",
  });
  const navigate = useNavigate();
  const estadoChange = (event, estado) => {
    setEstadoValue({ ...estadoValue, estado: estado });
  };
  const areaDestinoChange = (event, areaDestino) => {
    setEstadoValue({ ...estadoValue, areaDestino: areaDestino });
  };
  useEffect(() => {
    dispatch(getDocumentos());
  }, []);

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
        nuevoEstado: estadoValue.estado,
        sede: upperFormatearArea(estadoValue.areaDestino),
        _id: estadoValue._id,
      };

      dispatch(actualizarEstadoDocumento(bodyActualizarEstado));

      try {
        if (requestStatus === 200) {
          window.location.href = window.location.href;
        }
      } catch (error) {
        console.log(error);
      }
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
              <Divider />
              <div style={{ height: 450, width: "100%" }}>
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
                    } else {
                      setSelectionId(selection);

                      setEstadoValue({
                        ...estadoValue,
                        _id: selection[0],
                      });
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
                    {" "}
                    Opciones:
                  </Typography>
                </Paper>
                <Divider />
                <TabPanel value={value} index={0}>
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
                    <Grid item xs={1} />
                    <Grid item xs={2}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => setValue(1)}
                      >
                        Actualizar Estado
                      </Button>
                    </Grid>
                    <Grid item xs={1} />
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
                          <TextField {...params} label="Area" />
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
      <Footer />
    </React.Fragment>
  );
}
