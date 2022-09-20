import MainFeaturedPost from "../components/MainFeaturedPost";
import Footer from "../components/Footer";
import React from "react";
import { Divider, Grid } from "@mui/material";
import Box from "@mui/system/Box";
import Search from "../components/Search";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
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
  area: "Busqueda de docuementos",
};

export default function SearchDocumentsForm() {
  return (
    <React.Fragment>
      <MainFeaturedPost post={mainFeaturedPost} />

      <Box sx={{ flexGrow: 1 }} p={2}>
        <Grid container spacing={2}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Paper elevation={3}>
              <Search />
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
          <Grid item xs={2}></Grid>
        </Grid>
      </Box>
      <Footer />
    </React.Fragment>
  );
}
