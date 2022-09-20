import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//import all views
import AdminMainForm from "./views/AdminMainForm";
import AdminUsersForm from "./views/AdminUsersForm";
import LegalesForm from "./views/LegalesForm";
import LoginForm from "./views/LoginForm";
import MesaEntradaForm from "./views/MesaEntradaForm";
import MiembrosForm from "./views/MiembrosForm";
import NewDocumentsForm from "./views/NewDocumentsForm";
import SearchDocumentsForm from "./views/SearchDocumentsForm";
import NotFoundPage from "./views/NotFoundPage";

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/mesaentrada" element={<MesaEntradaForm />} />
          <Route
            path="/mesaentrada/nuevodocumento"
            element={<NewDocumentsForm />}
          />
          <Route path="/legales" element={<LegalesForm />} />
          <Route path="/miembros" element={<MiembrosForm />} />
          <Route path="/busqueda" element={<SearchDocumentsForm />} />
          <Route path="/admin" element={<AdminMainForm />} />
          <Route path="/admin/nuevousuario" element={<AdminUsersForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
