import React, { useEffect, useState }               from "react";
import MainFeaturedPost                             from "../../components/MainFeaturedPost";
import Footer                                       from "../../components/Footer";
import { renderCellExpand }                         from "../../components/CellExpand";
import { Button, Divider, Grid, Typography, Paper } from "@mui/material";
import { Box }                                      from "@mui/system";
import { DataGrid, GridToolbar, esES }              from "@mui/x-data-grid";
import { useNavigate }                              from "react-router-dom";
import { useDispatch, useSelector }                 from "react-redux";
import { getUsuarios }                              from "../../store/slices/usuarios/thunks";
import { verificarTokenAsync }                      from "../../store/slices/jwt/thunks";
import CircularIndeterminate                        from "../../components/Circular";
import AlertDialogSlide                             from "../../components/Dialog";

const columns = [
  {
    field      : "usuario",
    headerName : "Usuario",
    width      : 130,
    renderCell : renderCellExpand,
  },
  {
    field      : "email",
    headerName : "Email",
    width      : 130,
    renderCell : renderCellExpand,
  },
  {
    field      : "area",
    headerName : "Area",
    width      : 130,
    renderCell : renderCellExpand,
  },
  { 
    field      : "rol", 
    headerName : "Rol", 
    width      : 130, 
    renderCell : renderCellExpand },
  {
    field      : "nombre",
    headerName : "Nombre",
    width      : 130,
    renderCell : renderCellExpand,
  },
  {
    field      : "apellido",
    headerName : "Apellido",
    width      : 130,
    renderCell : renderCellExpand,
  },
  {
    field      : "tipoDocumento",
    headerName : "Tipo documento",
    width      : 130,
    renderCell : renderCellExpand,
  },
  {
    field      : "nroDocumento",
    headerName : "Numero documento",
    width      : 130,
    renderCell : renderCellExpand,
  },
  {
    field      : "fechaNacimiento",
    headerName : "Fecha nacimiento",
    width      : 130,
    renderCell : renderCellExpand,
  },
  {
    field      : "nroTelefono",
    headerName : "Telefono",
    width      : 130,
    renderCell : renderCellExpand,
  },
];

const mainFeaturedPost = {
  area : "Interfaz de Administrador",
};

export default function AdminMainForm() {

  const { listadoUsuarios = [], requestStatus } = useSelector(
    (state) => state.usuario
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //es el id seleccionado para enviar a editar
  const [selectionId, setSelectionId] = useState([]);

  useEffect(() => {

    dispatch(
      verificarTokenAsync(JSON.parse(localStorage.getItem("token")))
    ).then((resp) => {
      if (resp.payload.status === 403) {
        setDialogMessage({
          title    : "Su sesion ha caducado",
          message  : "Por favor vuelva a ingresar al sistema",
          expirado : true,
        });
        setPopup(true);
      }
    });
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
              <div style={{ height: 450, width: "100%", display: "grid" }}>
                {listadoUsuarios.length === 0 ? (
                  <CircularIndeterminate />
                ) : (
                  <>
                    <DataGrid
                      localeText             = {
                        esES.components.MuiDataGrid.defaultProps.localeText
                      }
                      getRowId               = {(r) => r._id}
                      rows                   = {listadoUsuarios}
                      columns                = {columns}
                      pageSize               = {6}
                      rowsPerPageOptions     = {[5]}
                      checkboxSelection 
                      selectionModel         = {selectionId}
                      onSelectionModelChange = {(selection) => {
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
                  </>
                )}
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Paper elevation={3}>
              <Box sx={{ height: 450, width: "100%" }}>
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
                    {" "}
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
                      disabled={!selectionId.length}
                      onClick={() => {
                        navigate("/admin/cambiarcontrasenia", {
                          state: selectionId,
                        });
                      }}
                    >
                      Cambiar contrasenña
                    </Button>
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      fullWidth
                      disabled={!selectionId.length}
                      onClick={() => {
                        navigate("/admin/editarusuario", {
                          state: selectionId,
                        });
                      }}
                    >
                      {" "}
                      Editar Usuario
                    </Button>
                  <p style={{textAlign:"center"}}>¡IMPORTANTE! </p>
                  <p style={{textAlign:"center"}}>Si edita el usuario actualmente logueado deberá iniciar sesión nuevamente.</p>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <AlertDialogSlide
        openPopup    ={openPopup}
        setOpenPopup ={setOpenPopup}
        content      ={dialogMessage}
      />
      <Footer />
    </React.Fragment>
  );
}
