import { createContext } from "react";

const RaffleContext = createContext({
  raffleData: {},
  setRaffleData: () => {},
  checked: [],
  setChecked: () => {},
  EnviarReserva: () => {},
});

export default RaffleContext;
