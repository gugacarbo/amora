import { useEffect, useState } from "react";
import AdminContext from "./index";
import api from "../../util/api";
export default ({ children }) => {
  const [token, setToken] = useState(null);

  const handleSetToken = (token) => {
    localStorage.setItem("adminToken", token);
    api.defaults.params = { ...api.defaults.params, token };

    api.post("/verifyToken.php", { token }).then(({ data }) => {
      if (data?.status == 200) {
        setToken(token);
      }
    });
  };

  useEffect(() => {
    const localToken = localStorage.getItem("adminToken");
    if (localToken) {
      handleSetToken(localToken);
    } else {
      handleSetToken("");
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{
        token,
        setToken: handleSetToken,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
