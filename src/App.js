import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ProtectedRoute } from "./components/ProtectedRoute";
//import all views
import AdminMainForm from "./views/AdminMainForm";
import AdminUsersForm from "./views/FormCrearNuevoUsuario.js/AdminUsersForm";
import LegalesForm from "./views/LegalesForm";
import LoginForm from "./views/LoginForm";
import MesaEntradaForm from "./views/MesaEntradaForm";
import MiembrosForm from "./views/MiembrosForm";
import NewDocumentsForm from "./views/NewDocumentsForm";
import SearchDocumentsForm from "./views/SearchDocumentsForm";
import NotFoundPage from "./views/NotFoundPage";
import FormDatosUsuario from "./views/FormCrearNuevoUsuario.js/FormDatosUsuario";
import EditDocumentsFrom from "./views/EditDocumentsForm";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#C20E0E",
    },
    secondary: {
      main: "#0e0d0e",
    },
    warning: {
      main: "#ffeb3b",
    },
  },
});

function App() {
  let usuario = {};
  !!localStorage.getItem("usuario")
    ? (usuario = JSON.parse(localStorage.getItem("usuario")))
    : (usuario = { area: "" });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header></Header>

      <Routes>
        <Route path="/" element={<LoginForm />} />

        <Route
          element={
            <ProtectedRoute
              redirectTo="/"
              isAllowed={
                !!usuario.usuario &&
                usuario.area.toUpperCase().includes("LEGALES")
              }
            />
          }
        >
          <Route path="/mesaentrada" element={<MesaEntradaForm />} />
          <Route
            path="/mesaentrada/nuevodocumento"
            element={<NewDocumentsForm />}
          />
          <Route
            path="/mesaentrada/editardocumento"
            element={<EditDocumentsFrom />}
          />
        </Route>

        <Route
          path="/legales"
          element={
            <ProtectedRoute
              redirectTo="/"
              isAllowed={
                !!usuario.usuario &&
                usuario.area.toUpperCase().includes("LEGALES")
              }
            >
              <LegalesForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/miembros"
          element={
            <ProtectedRoute
              redirectTo="/"
              isAllowed={
                !!usuario.usuario &&
                usuario.area.toUpperCase().includes("LEGALES")
              }
            >
              <MiembrosForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/busqueda"
          element={
            <ProtectedRoute redirectTo="/" isAllowed={!!usuario.usuario}>
              <SearchDocumentsForm />
            </ProtectedRoute>
          }
        />
        <Route
          element={
            <ProtectedRoute
              redirectTo="/"
              isAllowed={
                !!usuario.usuario && usuario.rol.toUpperCase().includes("ADMIN")
              }
            />
          }
        >
          <Route path="/admin" element={<AdminMainForm />} />
          <Route path="/admin/nuevousuario" element={<AdminUsersForm />} />
          <Route path="/admin/nuevousuario2" element={<FormDatosUsuario />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
