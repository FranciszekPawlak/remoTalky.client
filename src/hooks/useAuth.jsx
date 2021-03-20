import { useEffect, useContext } from "react";
import { Context } from "../components/Context";
import { useHistory } from "react-router-dom";
import * as Cookies from "js-cookie";
import { apiCall } from "../helpers/apiCall";

export const useAuth = () => {
  const history = useHistory();
  const { url, user, setUser } = useContext(Context);

  const checkToken = async () => {
    try {
      const res = await apiCall(`${url}/checkRole`, "GET");
      const { status, data } = res;
      if (status === 200 && data.username && data.role) {
        setUser(data);
        Cookies.set("user", JSON.stringify(data), { expires: 7 });
      } else {
        setUser(null);
        history.push("/login");
      }
    } catch (err) {
      console.error(err);
      setUser(null);
      history.push("/login");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (!user) {
        const cookieUser = Cookies.get("user");
        if (cookieUser) {
          const initialUser = JSON.parse(cookieUser);
          initialUser ? setUser(initialUser) : checkToken();
        } else {
          checkToken();
        }
      }
    }, 1000);
  }, [,]);
};
