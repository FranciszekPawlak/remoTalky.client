import axios from "axios";

export const apiCall = async (url, method = "GET", body = null) => {
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
  const res = await axios({
    url: url,
    method: "POST",
    data: data,
    withCredentials: true,
    responseType: "blob",
  });
  return res;
};

export const uploadFile = async (url, data) => {
  const res = await axios({
    url: url,
    method: "POST",
    headers: {
      "Contetnt-Type": "multipart/form-data",
    },
    data: data,
    withCredentials: true,
  });
  return res;
};
