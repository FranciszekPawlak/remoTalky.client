import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@material-ui/core";
import "style/files/uploadDialog.css";
export const UploadDialog = ({ open, setOpen, fileRef, upload }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <DialogTitle>Upload file</DialogTitle>
      <DialogContent>
        <input className="upload" ref={fileRef} type="file" />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Close
        </Button>
        <Button type="submit" color="primary" onClick={upload}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};
