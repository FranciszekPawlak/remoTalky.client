import React, { useState, useEffect, useRef, useContext } from "react";
import { Layout } from "./Layout";
import { DataGrid } from "@material-ui/data-grid";
import { apiDownload, uploadFile, apiCall } from "helpers/apiCall";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { AuthContext } from "context/AuthContext";
import format from "date-fns/format";
const columns = [
  { field: "id", headerName: "Id", hide: true },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "type", headerName: "Type", flex: 1 },
  {
    field: "uploadDate",
    headerName: "Upload date",
    flex: 1,
    valueGetter: (element) =>
      format(new Date(element.value), "yyyy-MM-dd' 'k:mm"),
  },
  {
    field: "size",
    headerName: "Size",
    flex: 1,
    valueGetter: (element) =>
      (parseInt(element.value) / 1024 / 1024).toFixed(2) + " MB",
  },
];

const rows = [
  { id: 12, name: "Snow", type: "png", uploadDate: "Jon", size: 35 },
  { id: 22, name: "Lannister", type: "jpg", uploadDate: "Cersei", size: 42 },
  { id: 33, name: "Lannister2", type: "pdf", uploadDate: "Jaime", size: 45 },
];

export const Files = () => {
  const { user, url } = useContext(AuthContext);
  const [selection, setSelection] = useState([]);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const fileRef = useRef(null);

  const uploadFileToServer = async () => {
    const data = new FormData();
    data.append("file", fileRef.current.files[0]);

    try {
      const res = await uploadFile(`${url}/file/upload`, data);
      if (res.data) {
        setFiles((prev) => [...prev, res.data]);
        toast.success("Success");
        setOpen(false);
      }
    } catch (err) {
      toast.error(err?.response?.statusText);
    }
  };

  const deleteFiles = async () => {
    try {
      const res = await apiCall(`${url}/file/delete`, "POST", {
        ids: selection,
      });
      if (res.data && res.data?.ids) {
        toast.success("Success");
        setFiles((prev) =>
          prev.filter((item) => !res.data.ids.includes(item._id))
        );
        setSelection([]);
      }
    } catch (err) {
      toast.error(err?.response?.statusText);
    }
  };

  const downloadFiles = async () => {
    console.log(selection);
    try {
      const res = await apiDownload(
        `${url}/file/download`,

        {
          ids: selection,
        }
      );

      var data = new Blob([res.data], { type: res.data.type });
      if (typeof window.navigator.msSaveBlob === "function") {
        // If it is IE that support download blob directly.
        window.navigator.msSaveBlob(data, "file");
      } else {
        var blob = data;
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "file";

        document.body.appendChild(link);

        link.click();
      }
    } catch (err) {
      toast.error(err?.response?.statusText);
    }
  };

  const getFiles = async () => {
    try {
      const res = await apiCall(`${url}/file/list`, "GET");
      if (res.data) {
        setFiles(res.data);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    getFiles();
  }, [,]);

  return (
    <Layout>
      {selection.length > 0 && (
        <>
          <Button variant="contained" color="primary" onClick={downloadFiles}>
            Download
          </Button>
          <Button variant="contained" color="primary" onClick={deleteFiles}>
            Delete
          </Button>
        </>
      )}
      <Button onClick={() => setOpen(true)} variant="contained" color="primary">
        Upload
      </Button>
      <DataGrid
        autoHeight={true}
        onSelectionModelChange={(e) => setSelection(e.selectionModel)}
        rows={files}
        columns={columns}
        pageSize={10}
        checkboxSelection
        pagination
      />

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Create Event</DialogTitle>
        <DialogContent>
          <input
            ref={fileRef}
            type="file"
            style={{ padding: 30, border: "1px solid blue" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>

          <Button type="submit" color="primary" onClick={uploadFileToServer}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};
