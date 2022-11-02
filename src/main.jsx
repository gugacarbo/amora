import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppContext from "./context/AppContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppContext>
    <App />
  </AppContext>
);
