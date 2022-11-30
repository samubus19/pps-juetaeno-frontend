import { Route, Routes }              from "react-router-dom";
import Header                         from "./components/Header";
import CssBaseline                    from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ProtectedRoute }             from "./components/ProtectedRoute";
//import all views
import AdminMainForm                  from "./views/Admin/AdminMainForm";
import AdminUsersForm                 from "./views/Admin/FormCrearNuevoUsuario/AdminUsersForm";
import LegalesForm                    from "./views/Legales/LegalesForm";
import LoginForm                      from "./views/Usuario/LoginForm";
import MesaEntradaForm                from "./views/MesaEntrada/MesaEntradaForm";
import MiembrosForm                   from "./views/MiembrosJunta/MiembrosForm";
import NewDocumentsForm               from "./views/Documentos/NewDocumentsForm";
import SearchDocumentsForm            from "./views/Documentos/SearchDocumentsForm";
import NotFoundPage                   from "./views/NotFoundPage";
import FormDatosUsuario               from "./views/Admin/FormCrearNuevoUsuario/FormDatosUsuario";
import EditDocumentsFrom              from "./views/Documentos/EditDocumentsForm";
import FormEditarUsuarioPersona       from "./views/Admin/FormEditarUsuarioPersona";
import FormCambiarContraseniaUsuario  from "./views/Admin/FormCambiarContrasenia";
import desencriptarUsuario            from "./helpers/Desencriptador";

const theme = createTheme({
  palette: {
    type    : "light",
    primary : {
      main : "#C20E0E",
    },
    secondary : {
      main : "#0e0d0e",
    },
    warning : {
      main : "#ffeb3b",
    },
  },
});

function App() {
  // window.addEventListener("storage", (e) => {
  //   localStorage.clear()
  //   window.location.reload()
  // })

  let usuario = {};
  !!localStorage.getItem("usuario")
    ? (usuario = desencriptarUsuario(localStorage.getItem("usuario").replaceAll('"', ''),  localStorage.getItem("token").replaceAll('"', '')))
    : (usuario = { area: "", rol : "" });
  
  
  return (
    <>
    {
      !!usuario && usuario!== undefined && usuario !== "" ? (
        <>
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
                      (usuario.area.toUpperCase().includes("MESAENTRADA") || usuario.rol.toUpperCase().includes("ADMIN"))
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
                      (usuario.area.toUpperCase().includes("LEGALES") || usuario.rol.toUpperCase().includes("ADMIN"))
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
                      (usuario.area.toUpperCase().includes("MIEMBROS") || usuario.rol.toUpperCase().includes("ADMIN"))
                    }
                  >
                    <MiembrosForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/busqueda"
                element={
                  <ProtectedRoute redirectTo="/" 
                  isAllowed={!!usuario.usuario}
                  >
                    <SearchDocumentsForm />
                  </ProtectedRoute>
                }
              />
              <Route
                element={
                  <ProtectedRoute
                    redirectTo="/"
                    isAllowed={
                      !!usuario && usuario.rol.toUpperCase().includes("ADMIN")
                    }
                  />
                }
              >
                <Route path="/admin" element={<AdminMainForm />} />
                <Route path="/admin/nuevousuario" element={<AdminUsersForm />} />
                <Route path="/admin/nuevousuario2" element={<FormDatosUsuario />} />
                <Route path="/admin/editarusuario" element={<FormEditarUsuarioPersona />} />
                <Route path="/admin/cambiarcontrasenia" element={<FormCambiarContraseniaUsuario />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ThemeProvider>
        </>
      ) : (
        null
      )
    }
    </>
  );
}

export default App;
