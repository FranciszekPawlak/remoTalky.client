import axios from "axios";

export const apiCall = async (url, method, body) => {
  const res = await axios({
    method: method,
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    withCredentials: true,
  });
  console.log("async działa");
  return res;
};
