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
  boughtNumbers: [],
  setBoughtNumbers: () => {},
  getRifa: () => {},
  resetClientData: () => {},
});

export default RaffleContext;
