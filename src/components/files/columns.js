import format from "date-fns/format";

export const columns = [
  { field: "id", headerName: "Id", hide: true },
  { field: "name", headerName: "Name", flex: 2 },
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
