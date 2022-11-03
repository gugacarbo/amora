import axios from "axios";
import { useEffect, useState } from "react";

import RaffleContext from "./index";

export default ({ children }) => {
  const [raffleData, setRaffleData] = useState({});
  const [checked, setChecked] = useState([]);

  function handleChecked(number, remove = false) {
    if (checked.includes(number)) {
      setChecked(checked.filter((item) => item !== number));
    } else if (raffleData.number_array[number] === undefined) {
      setChecked([...checked, number]);
    }
    if (remove && checked.includes(number)) {
      setChecked(checked.filter((item) => item !== number));
    }
  }
  function resetChecked() {
    setChecked([]);
  }

  const reserveNumbers = (clientData) =>
    axios.post("http://localhost/api/reservar.php", {
      id: raffleData.id,
      numbers: checked,
      ...clientData,
    });

  return (
    <RaffleContext.Provider
      value={{
        raffleData,
        setRaffleData,
        checked,
        setChecked: handleChecked,
        resetChecked,
        reserveNumbers,
      }}
    >
      {children}
    </RaffleContext.Provider>
  );
};
