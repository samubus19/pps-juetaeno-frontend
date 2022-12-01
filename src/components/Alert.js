import * as React      from "react";
import Dialog          from "@mui/material/Dialog";
import Alert           from "@mui/material/Alert";
import AlertTitle      from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";

export default function AlertDialog(props) {
  const { openAlert, setOpenAlertDialog, route, content } = props;

  const navigate = useNavigate();

  const onTimeClose = () => {
    setTimeout(() => {
      switch (content.type) {
        
        case "success":
          setOpenAlertDialog(false);
          if(!!route){
            navigate(`${route}`);
          }
          if (content.reaload) {
            window.location.reload()
          }
          break;
        
        case "error":
          setOpenAlertDialog(false);
          break;
        
        case "warning":
          setOpenAlertDialog(false);
          break;
        
        default:
          break;
      }
      
    }, 4000);
  };
  onTimeClose();

  return (
    <div>
      <Dialog
        open             = {openAlert}
        aria-labelledby  = "alert-dialog-title"
        aria-describedby = "alert-dialog-description"
        //onClose={handleClose}
      >
        <Alert severity={content.type}>
          <AlertTitle>{content.title}</AlertTitle>
          {content.message}
        </Alert>
      </Dialog>
    </div>
  );
}

/** al ocupar el componente de dialogo el formulario debera incluir 
  import AlertDialog from "../../components/Alert";
  const route = "/rutaAUsar"; 
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    type:"", 
    title: "",
    message: "",
    reaload: false
  });
  const setOpenAlertDialog = (isTrue) => {setOpenAlert(isTrue);};

 * 
   <AlertDialog
        openAlert={openAlert}
        setOpenAlertDialog={setOpenAlertDialog}
        route={route}
        content={alertMessage}
      />
 * 
 */
