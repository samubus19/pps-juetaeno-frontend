import * as React            from "react";
import Box                   from "@mui/material/Box";
import List                  from "@mui/material/List";
import ListItemButton        from "@mui/material/ListItemButton";
import ListItemText          from "@mui/material/ListItemText";
import ListItemIcon          from '@mui/material/ListItemIcon';
import { useNavigate }       from "react-router-dom";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import FindInPageIcon        from '@mui/icons-material/FindInPage';
import ListAltIcon           from '@mui/icons-material/ListAlt';
import HomeIcon              from '@mui/icons-material/Home';

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
        {
          localStorage.getItem("usuario") && JSON.parse(localStorage.getItem("usuario")).rol.toUpperCase() === "ADMIN" ?
          (
            <>
              <ListItemButton onClick={redirect} >
                <ListItemIcon style={{justifyContent:"center"}}>
                  <SupervisorAccountIcon color="red"/>
                </ListItemIcon>
                <ListItemText primary="Panel administrador" style={{justifyContent:"left"}}/>
              </ListItemButton>
              
              <ListItemButton
              onClick={() => {
                navigate("/busqueda");
              }}
            >
              <ListItemIcon style={{justifyContent:"center"}}>
                <FindInPageIcon/>
              </ListItemIcon>
              <ListItemText primary="Buscar documentos" style={{justifyContent:"left"}}/>
            
            </ListItemButton>
              <ListItemButton onClick={() => navigate("/legales")}>
                <ListItemIcon style={{justifyContent:"center"}}>
                  <ListAltIcon/>
                </ListItemIcon>
                <ListItemText primary="Legales" style={{justifyContent:"left"}}/>
              </ListItemButton>
             
              <ListItemButton onClick={() => navigate("/mesaentrada")}>
                <ListItemIcon style={{justifyContent:"center"}}>
                  <ListAltIcon/>
                </ListItemIcon>
                <ListItemText primary="Mesa de entrada" style={{justifyContent:"left"}}/>
              </ListItemButton>
              
              <ListItemButton onClick={() => navigate("/miembros")}>
                <ListItemIcon style={{justifyContent:"center"}}>
                  <ListAltIcon/>
                </ListItemIcon>
                <ListItemText primary="Miembros de junta" style={{justifyContent:"left"}}/>
              </ListItemButton>
            </>
          ) : (
            <>
              <ListItemButton onClick={redirect}>
                <ListItemIcon style={{justifyContent:"center"}}>
                  <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary="Inicio" style={{justifyContent:"left"}}/>
              </ListItemButton>
              
              <ListItemButton
                onClick={() => {
                  navigate("/busqueda");
                }}
              >
                <ListItemIcon style={{justifyContent:"center"}}>
                  <FindInPageIcon/>
                </ListItemIcon>
                <ListItemText primary="Buscar documentos" style={{jstifyContent:"left"}}/>
              </ListItemButton>
            </>
          )
        }
      </List>
    </Box>
  );
};

export default SelectedListItem;
