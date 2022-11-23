import { createContext } from "react";

const AdminContext = createContext({
  token: "",
  setToken: () => {},
});

export default AdminContext;
