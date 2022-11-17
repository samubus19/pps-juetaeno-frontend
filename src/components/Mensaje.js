import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const { openPopup, setOpenPopup } = props;

  const navigate = useNavigate();


  const handleClose = () => {
   setOpenPopup(false)
  };

  const handleAgree = () => {
        navigate("/mesaentrada")
  }

  return (
    <div>
      <Dialog
        open={openPopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Desea cancelar la operacion"}</DialogTitle>
      
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAgree}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
