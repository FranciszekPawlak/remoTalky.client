import axios from "axios";
import { toast } from "react-toastify";
import { downloadBlob } from "helpers/downloadBlob";

export const callApi = async (
  url,
  method,
  callBack,
  body,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  try {
    const res = await axios({
      method: method,
      url: url,
      headers: headers,
      data: body,
      withCredentials: true,
    });
    if (res.data) {
      callBack(res.data);
    } else {
      toast.error("Invalid data");
    }
  } catch (err) {
    console.error(err);
    toast.error(err?.response?.statusText);
  }
};

export const authCall = async (url, method = "GET", body = null) => {
  const res = await axios({
    method: method,
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    withCredentials: true,
  });
  return res;
};

export const swrCall = async (url) => {
  const res = await axios({
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return res.data;
};

export const apiDownload = async (url, data) => {
  try {
    const res = await axios({
      url: url,
      method: "POST",
      data: data,
      withCredentials: true,
      responseType: "blob",
    });
    downloadBlob(res.data);
  } catch (err) {
    toast.error(err?.response?.statusText);
  }
};
