import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

const SelectedListItem = (props) => {
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

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton onClick={redirect}>
          <ListItemText primary="Inicio" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            navigate("/busqueda");
          }}
        >
          <ListItemText primary="Consulta" />
        </ListItemButton>

        <ListItemButton onClick={() => {}}>
          <ListItemText primary="Tutorial" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default SelectedListItem;
