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
  cancelReserve: (number, clientId, raffleId) => {},
  payMessage: false,
  setPayMessage: () => {},
});

export default RaffleContext;
