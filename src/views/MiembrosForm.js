import MainFeaturedPost from "../components/MainFeaturedPost";
import Footer from "../components/Footer";
import React from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import Search from "../components/Search";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import TabPanel from "../components/TabPanel";
import { Stack } from "@mui/system";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const estado = [{ label: "PASE" }];
const area = [{ label: "Mesa de Entrada" }, { label: "legales" }];
const filterType = [
  { label: "EXP (expediente)" },
  { label: "NO (notas)" },
  { label: "REC (reclamos)" },
  { label: "CES (ceses)" },
];

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const mainFeaturedPost = {
  area: "Miembros de Junta",
};

export default function MiembrosForm() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  //son los datos para la busqueda que se deben mapear despues
  const [filterBy, setFilterBy] = useState("");
  const filterBySearch = (filterData) => {
    setFilterBy(filterData);
  };

  const cheked = (e) => {};
  return (
    <React.Fragment>
      <MainFeaturedPost post={mainFeaturedPost} />

      <Box sx={{ flexGrow: 1 }} pt={2} pl={4} pr={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Paper elevation={3}>
              <Search filterType={filterType} filterBySearch={filterBySearch} />
              <Divider />
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Paper elevation={3}>
              <Box sx={{ height: 450, width: "100%" }}>
                <Paper
                  component="form"
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
                        renderInput={(params) => (
                          <TextField {...params} label="Estado" />
                        )}
                      />
                      <Autocomplete
                        disablePortal
                        fullWidth
                        id="combo-box-demo"
                        options={area}
                        renderInput={(params) => (
                          <TextField {...params} label="Area" />
                        )}
                      />
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => setValue(0)}
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
