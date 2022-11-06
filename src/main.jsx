import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppContext from "./context/AppContextProvider";

import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppContext>
    <App />
  </AppContext>
);
