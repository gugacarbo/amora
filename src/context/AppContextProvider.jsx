import RaffleProvider from "./RaffleContext/RaffleProvider";
import StyleProvider from "./StyleContext/StyleProvider";
import { useEffect } from "react";
import api from "../util/api";

function AppContextProvider({ children }) {
  useEffect(() => {
    api.get("/verifyVisitor.php")
  }, []);
  return (
    <StyleProvider>
      <RaffleProvider>{children}</RaffleProvider>
    </StyleProvider>
  );
}

export default AppContextProvider;
