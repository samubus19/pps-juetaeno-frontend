import * as React from "react";
import Box        from "@mui/material/Box";
import Container  from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link       from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Diseño © "}
      <Link color="inherit" href="">
        UNLaR
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Footer(props) {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          J.U.E.T.A.E.N.O
        </Typography>
        <Typography
          variant   = "subtitle1"
          align     = "center"
          color     = "text.secondary"
          component = "p"
        >
          (Junta Única de Evaluación de Títulos y Antecedentes del Educador del
          Nivel Obligatorio)
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}

export default Footer;
