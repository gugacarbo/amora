import RaffleProvider from "./RaffleContext/RaffleProvider";
import StyleProvider from "./StyleContext/StyleProvider";
import AdminProvider from "../admin/context/AdminContext/AdminProvider";
import { useEffect } from "react";
import api from "../util/api";

function AppContextProvider({ children }) {
  useEffect(() => {
    api.get("/verifyVisitor.php");
  }, []);
  return (
    <StyleProvider>
      <AdminProvider>
        <RaffleProvider>{children}</RaffleProvider>
      </AdminProvider>
    </StyleProvider>
  );
}

export default AppContextProvider;
