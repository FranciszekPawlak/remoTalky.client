import axios from "axios";
import { toast } from "react-toastify";
import { downloadBlob } from "helpers/downloadBlob";
import { config } from "config";
import * as Cookies from "js-cookie";

export const callApi = async (
  url,
  method,
  callBack,
  body,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const token = Cookies.get("token");
  try {
    const res = await axios({
      method: method,
      url: `${config.apiUrl}${url}`,
      headers: { ...headers, Authorization: token },
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
  const token = Cookies.get("token");

  const res = await axios({
    method: method,
    url: `${config.apiUrl}${url}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data: body,
    withCredentials: true,
  });
  return res;
};

export const swrCall = async (url) => {
  const token = Cookies.get("token");

  const res = await axios({
    url: `${config.apiUrl}${url}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    withCredentials: true,
  });
  return res.data;
};

export const apiDownload = async (url, data) => {
  const token = Cookies.get("token");

  try {
    const res = await axios({
      url: `${config.apiUrl}${url}`,
      method: "POST",
      data: data,
      withCredentials: true,
      responseType: "blob",
      headers: {
        Authorization: token,
      },
    });
    downloadBlob(res.data);
  } catch (err) {
    toast.error(err?.response?.statusText);
  }
};
