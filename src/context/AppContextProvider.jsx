import StyleProvider from "./StyleContext/StyleProvider";

function AppContextProvider({ children }) {
  return <StyleProvider>{children}</StyleProvider>;
}

export default AppContextProvider;
