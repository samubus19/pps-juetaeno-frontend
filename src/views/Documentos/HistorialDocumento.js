import React, { useEffect, useState }               from "react";
import MainFeaturedPost                             from "../../components/MainFeaturedPost";
import Footer                                       from "../../components/Footer";
import { renderCellExpand }                         from "../../components/CellExpand";
import { Divider, Grid, Paper }                     from "@mui/material";
import { Box }                                      from "@mui/system";
import { DataGrid, GridToolbar, esES }              from "@mui/x-data-grid";
import { useLocation }                              from "react-router-dom";
import { useDispatch, useSelector }                 from "react-redux";
import { verificarTokenAsync }                      from "../../store/slices/jwt/thunks";
import AlertDialogSlide                             from "../../components/Dialog";
import { getDocumentoPorIdAsync }                   from "../../store/slices/documentos";
import SimpleBackdrop                               from "../../components/Backdrop";

const columns = [
    {
      field      : "tipoDocumento",
      headerName : "Tipo Documento",
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
      headerName : "Descripción",
      width      : 200,
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
        width      : 130,
        renderCell : renderCellExpand,
      },
    {
        field      : "fechaIngreso",
        headerName : "Fecha de ingreso al área",
        width      : 180,
        renderCell : renderCellExpand,
    },
    {
        field      : "fechaSalida",
        headerName : "Fecha de salida del área",
        width      : 180,
        renderCell : renderCellExpand,
    },
    {
      field      : "firmante",
      headerName : "Firmante",
      width      : 130,
      renderCell : renderCellExpand,
    }
  ];

const mainFeaturedPost = {
  area : "Historial de documento",
};

export default function HistorialDocumento() {

    let historial = useSelector(
        (state) => state.documento.historial
    );

  const [dialogMessage, setDialogMessage] = useState({
    title    : "",
    message  : "",
    expirado : false,
  });

  const [openPopup, setPopup] = useState(false);

  const setOpenPopup = (isTrue) => {
    setPopup(isTrue);
  };

  const dispatch = useDispatch();

  let idDocumento = useLocation().state[0]._id;

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
    }).then(() => {
        dispatch(getDocumentoPorIdAsync(idDocumento))
        .then((resp) => {
            historial = resp.payload.data.mensaje;
    })
    })
    
  }, []);

  return (
    <React.Fragment>
      <MainFeaturedPost post={mainFeaturedPost} />
      {
        historial && historial.length > 0 ? (
            <Box sx={{ flexGrow: 1 }} pt={2} pl={4} pr={4}>
                <Grid container spacing={2}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                    <Paper elevation={3}>
                    <Divider />
                    <div style={{ height: 500, width: "100%", display: "grid" }}>
                            <DataGrid
                            localeText             = {
                                esES.components.MuiDataGrid.defaultProps.localeText
                            }
                            getRowId               = {(r) => r._id}
                            rows                   = {historial}
                            columns                = {columns}
                            pageSize               = {6}
                            rowsPerPageOptions     = {[5]}
                            components             = {{ Toolbar: GridToolbar }}
                            componentsProps        = {{
                                toolbar : {
                                    showQuickFilter  : true,
                                    quickFilterProps : { debounceMs: 500 },
                                    csvOptions       : { disableToolbarButton: true },
                                    printOptions     : { disableToolbarButton: true },
                                },
                            }}
                            />
                    </div>
                    </Paper>
                </Grid>
                </Grid>
            </Box>
        ) : (
            <SimpleBackdrop/>
        )
      }

      
      <AlertDialogSlide
        openPopup    ={openPopup}
        setOpenPopup ={setOpenPopup}
        content      ={dialogMessage}
      />
      <Footer />
    </React.Fragment>
  );
}
