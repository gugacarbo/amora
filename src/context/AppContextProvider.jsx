import RaffleProvider from "./RaffleContext/RaffleProvider";
import StyleProvider from "./StyleContext/StyleProvider";

function AppContextProvider({ children }) {
  return (
    <StyleProvider>
      <RaffleProvider>{children}</RaffleProvider>
    </StyleProvider>
  );
}

export default AppContextProvider;
