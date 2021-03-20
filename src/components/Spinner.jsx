import CircularProgress from "@material-ui/core/CircularProgress";
import "../style/spinner.css";
export const Spinner = () => (
  <div className="spinner-container">
    <CircularProgress></CircularProgress>
  </div>
);
