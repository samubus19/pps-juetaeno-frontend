import React, { useEffect, useState } from "react";
import MainFeaturedPost from "../../components/MainFeaturedPost";
import Footer from "../../components/Footer";
import TabPanel from "../../components/TabPanel";
import { renderCellExpand } from "../../components/CellExpand";
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
import { getUsuarios } from "../../store/slices/usuarios/thunks";
import { verificarTokenAsync } from "../../store/slices/jwt/thunks";

const columns = [
  { field: "usuario", headerName: "Usuario", width: 90, renderCell: renderCellExpand },
  { field: "email", headerName: "Email", width: 90, renderCell: renderCellExpand },
  { field: "area",  headerName: "Area",  width: 90, renderCell: renderCellExpand},
  { field: "rol",   headerName: "Rol",   width: 90, renderCell: renderCellExpand},
  { field: "nombre",   headerName: "Nombre",   width: 90, renderCell: renderCellExpand},
  { field: "apellido",   headerName: "Apellido",   width: 90, renderCell: renderCellExpand},
  { field: "tipoDocumento",   headerName: "Tipo documento",   width: 90, renderCell: renderCellExpand},
  { field: "nroDocumento",   headerName: "Numero documento",   width: 90, renderCell: renderCellExpand},
  { field: "fechaNacimiento",   headerName: "Fecha nacimiento",   width: 90, renderCell: renderCellExpand},
  { field: "nroTelefono",   headerName: "Telefono",   width: 90, renderCell: renderCellExpand},
 
];


const mainFeaturedPost = {
  area: "Interfaz de Administrador",
};

export default function AdminMainForm() {
   const { listadoUsuarios = [], requestStatus } = useSelector((state) => state.usuario);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //es el id seleccionado para enviar a editar
  const [selectionId, setSelectionId] = useState([]);
  useEffect(() => {
    dispatch(verificarTokenAsync(JSON.parse(localStorage.getItem("token"))));
    dispatch(getUsuarios());
  }, []);
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
                  rows={listadoUsuarios}
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
                    } else {
                      setSelectionId(selection);
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
                        navigate("/admin/nuevousuario");
                      }}
                    >
                      Nuevo Usuario
                    </Button>
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        navigate("/admin/editarusuario", {
                          state : selectionId
                        });
                      }}
                    >
                      {" "}
                      Editar Usuario
                    </Button>
                  </Grid>
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
