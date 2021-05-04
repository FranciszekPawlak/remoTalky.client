import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import * as Cookies from "js-cookie";
import { authCall } from "../helpers/apiCall";

export const useAuth = () => {
  const history = useHistory();
  const { user, setUser } = useContext(AuthContext);

  const checkToken = async () => {
    try {
      const res = await authCall(`/checkRole`, "GET");
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
          console.log(initialUser);
          initialUser ? setUser(initialUser) : checkToken();
        } else {
          checkToken();
        }
      }
    }, 1000);
  }, [,]);
};
