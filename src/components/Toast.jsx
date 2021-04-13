import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "../style/toast.css";
export const Toast = ({ type, message, closeAction }) => {
  return (
    <Snackbar
      open
      color="primary"
      children={
        <Alert severity={type} className="toast">
          {message}
          <IconButton aria-label="close" color="inherit" onClick={closeAction}>
            <CloseIcon />
          </IconButton>
        </Alert>
      }
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    />
  );
};
