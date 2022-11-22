import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const { openPopup, setOpenPopup, route,  content  } = props;

  const navigate = useNavigate();

  const handleClose = () => {
    setOpenPopup(false);
  };

  const handleAgree = () => {
    navigate(`${route}`);
  };

  return (
    <div>
      <Dialog
        open={openPopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{content.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {content.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAgree}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

/** al ocupar el componente de dialogo el formulario debera incluir 
 * const dialogMessage = {
  title: "titulo del dialogo",
  message: "mensaje  del dialogo",
  };
   const route = "/mesaentrada"; 
*  const [openPopup, setPopup] = useState(false);
   const setOpenPopup = (isTrue) => {setPopup(isTrue);};
   const cancel = () => {setPopup(true);};

 * <AlertDialogSlide
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        route={route}
        content={dialogMessage}
      />
 * 
 */