import { useEffect } from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AdminContext from "./context/AdminContext";
function Logout() {
  const { setToken } = useContext(AdminContext);
  useEffect(() => setToken(""), []);
  return <Navigate to="/admin" />;
}

export default Logout;
