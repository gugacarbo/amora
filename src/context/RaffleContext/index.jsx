import { createContext } from "react";

const RaffleContext = createContext({
  raffleData: {},
  setRaffleData: () => {},
  checked: [],
  setChecked: () => {},
  EnviarReserva: () => {},
  clientNumbers: [],
  setClientNumbers: () => {},
  clientToken: "",
  setClientToken: () => {},
  clientData: {},
  setClientData: () => {},
  openFormButtonRef: {},
});

export default RaffleContext;
