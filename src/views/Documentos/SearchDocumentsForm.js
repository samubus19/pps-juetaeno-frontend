import React, { useEffect, useState }   from "react";
import MainFeaturedPost                 from "../../components/MainFeaturedPost";
import Footer                           from "../../components/Footer";
import { renderCellExpand }             from "../../components/CellExpand";
import { getDocumentos }                from "../../store/slices/documentos";
import { Button, Divider, Grid, Paper } from "@mui/material";
import { Box }                          from "@mui/system";
import { DataGrid, GridToolbar, esES }  from "@mui/x-data-grid";
import { useNavigate }                  from "react-router-dom";
import { useDispatch, useSelector }     from "react-redux";
import { verificarTokenAsync }          from "../../store/slices/jwt/thunks";
import CircularIndeterminate            from "../../components/Circular";
import AlertDialogSlide                 from "../../components/Dialog";
import desencriptarUsuario              from "../../helpers/Desencriptador";

const columns = [
  {
    field      : "tipoDocumento",
    headerName : "Tipo ",
    width      : 80,
    renderCell : renderCellExpand,
  },
  {
    field      : "nroDocumento",
    headerName : "Número",
    width      : 80,
    renderCell : renderCellExpand,
  },
  {
    field      : "descripcion",
    headerName : "Descripcion",
    width      : 200,
    renderCell : renderCellExpand,
  },
   {
     field     : "fechaIngresoInst",
    headerName : "Fecha de ingreso a la institución",
    width      : 220,
    renderCell : renderCellExpand,
  },
  {
    field      : "estado",
    headerName : "Estado",
    width      : 130,
    renderCell : renderCellExpand,
  },
  {
    field      : "sede",
    headerName : "Sede",
    width      : 200,
    renderCell : renderCellExpand,
  },
  {
     field     : "fechaIngresoArea",
    headerName : "Fecha de ingreso al área",
    width      : 200,
    renderCell : renderCellExpand,
  },
  {
    field      : "fechaSalida",
    headerName : "Fecha de salida de la institución",
    width      : 220,
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
  area : "Busqueda de docuementos",
};

export default function SearchDocumentsForm() {

  const [dialogMessage, setDialogMessage] = useState({
    title    : "",
    message  : "",
    expirado : false,
  });
  const [openPopup, setPopup] = useState(false);
  
  const setOpenPopup = (isTrue) => {
    setPopup(isTrue);
  };

  const { showDocumentos = [] }       = useSelector((state) => state.documento);
  const dispatch                      = useDispatch();
  const navigate                      = useNavigate();

  const redirect = (e) => {
    switch (desencriptarUsuario(localStorage.getItem("usuario").replaceAll('"', ''),  localStorage.getItem("token").replaceAll('"', '')).area.toUpperCase()) {
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
    dispatch(
      verificarTokenAsync(JSON.parse(localStorage.getItem("token")))
    ).then((resp) => {
      if (resp.payload.status === 403) {
        setDialogMessage({
          title: "Su sesión ha caducado",
          message: "Por favor vuelva a ingresar al sistema",
          expirado: true,
        });
        setPopup(true);
      }
    });
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
              <div style={{ height: 500, width: "100%", display: "grid" }}>
                {showDocumentos.length === 0 ? (
                  <CircularIndeterminate />
                ) : (
                  <>
                    <DataGrid
                      localeText={
                        esES.components.MuiDataGrid.defaultProps.localeText
                      }
                      getRowId={(r) => r._id}
                      rows={showDocumentos}
                      columns={columns}
                      pageSize={6}
                      rowsPerPageOptions={[5]}
                      disableSelectionOnClick={true}
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
          <Grid item xs={1}></Grid>
        </Grid>
      </Box>
      <AlertDialogSlide
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        content={dialogMessage}
      />
      <Footer />
    </React.Fragment>
  );
}
