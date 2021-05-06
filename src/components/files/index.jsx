import React, { useState, useRef, useContext } from "react";
import { Layout } from "components/Layout";
import { DataGrid } from "@material-ui/data-grid";
import { apiDownload, callApi, swrCall } from "helpers/apiCall";
import { Button } from "@material-ui/core";
import { toast } from "react-toastify";
import { AuthContext } from "context/AuthContext";
import { columns } from "components/files/columns";
import useSWR from "swr";
import { UploadDialog } from "components/files/UploadDialog";
import "style/files/index.css";
const Files = () => {
  const { url } = useContext(AuthContext);
  const [selection, setSelection] = useState([]);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const fileRef = useRef(null);

  const itemsInTable = 10;

  useSWR(`/file/list`, swrCall, {
    onSuccess: (e) => setFiles(e),
    refreshInterval: 10000,
  });

  const deleteFiles = () =>
    callApi(`/file/delete`, "POST", deleteCallback, {
      ids: selection,
    });

  const downloadFiles = () => apiDownload(`/file/download`, { ids: selection });

  const upload = () => {
    const data = new FormData();
    data.append("file", fileRef.current.files[0]);

    callApi(`/file/upload`, "POST", uploadCallback, data, {
      "Contetnt-Type": "multipart/form-data",
    });
  };

  const uploadCallback = (data) => {
    setFiles((prev) => [...prev, data]);
    toast.success("Success");
    setOpen(false);
  };

  const deleteCallback = (data) => {
    toast.success("Success");
    const list = data.ids ? data.ids : selection;
    setFiles((prev) => prev.filter((item) => !list.includes(item._id)));
    setSelection([]);
  };

  return (
    <Layout>
      <div className="files-buttons">
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

        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="primary"
        >
          Upload
        </Button>
      </div>

      <DataGrid
        autoHeight={true}
        onSelectionModelChange={(e) => setSelection(e.selectionModel)}
        rows={files}
        columns={columns}
        pageSize={itemsInTable}
        checkboxSelection
        pagination
      />

      <UploadDialog
        open={open}
        setOpen={setOpen}
        fileRef={fileRef}
        upload={upload}
      />
    </Layout>
  );
};

export default Files;
