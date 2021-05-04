export const downloadBlob = (data) => {
  var blob = new Blob([data], { type: data.type });
  if (typeof window.navigator.msSaveBlob === "function") {
    // If it is IE that support download blob directly.
    window.navigator.msSaveBlob(data, "file");
  } else {
    var blobObject = blob;
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blobObject);
    link.download = "file";

    document.body.appendChild(link);

    link.click();
  }
};
