import React, { useEffect, useState } from "react";
import MainFeaturedPost from "../../components/MainFeaturedPost";
import Footer from "../../components/Footer";
import { renderCellExpand } from "../../components/CellExpand";
import { getDocumentos } from "../../store/slices/documentos";
import { Button, Divider, Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
    field: "fechaSalida",
    headerName: "Fecha de Salida",
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
  area: "Busqueda de docuementos",
};

export default function SearchDocumentsForm() {
  const { showDocumentos = [] } = useSelector((state) => state.documento);
  const dispatch = useDispatch();
  //es el id seleccionado para enviar a editar
  const [selectionId, setSelectionId] = useState([]);
  const navigate = useNavigate();
  const redirect = (e) => {
    switch (JSON.parse(localStorage.getItem("usuario")).area.toUpperCase()) {
      case "LEGALES":
        navigate("/legales");
        break;
      case "MIEMBROS":
        navigate("/miembros");
        break;

      case "ADMIN":
        navigate("/admin");
        break;

      case "MESAENTRADA":
        navigate("/mesaentrada");
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    dispatch(getDocumentos());
  }, []);

  return (
    <React.Fragment>
      <MainFeaturedPost post={mainFeaturedPost} />

      <Box sx={{ flexGrow: 1 }} p={1}>
        <Grid container spacing={2}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <div style={{ height: 40, width: "100%" }}>
              <Button variant="contained" onClick={redirect}>
                Volver
              </Button>
            </div>
            <Paper elevation={3}>
              <Divider />
              <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                  localeText={
                    esES.components.MuiDataGrid.defaultProps.localeText
                  }
                  getRowId={(r) => r._id}
                  rows={showDocumentos}
                  columns={columns}
                  pageSize={6}
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
          <Grid item xs={1}></Grid>
        </Grid>
      </Box>
      <Footer />
    </React.Fragment>
  );
}
