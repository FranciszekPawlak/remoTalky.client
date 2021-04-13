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
