import api from "../../util/api";
import { useEffect, useState, useRef } from "react";

import RaffleContext from "./index";

export default ({ children }) => {
  const [raffleData, setRaffleData] = useState({});
  const [checked, setChecked] = useState([]);
  const [clientNumbers, setClientNumbers] = useState([]);

  useEffect(() => {
    api.get("/getRifa.php").then(({ data }) => {
      setRaffleData(data.data);
    });
  }, []);

  function handleChecked(number) {
    if (checked.includes(number)) {
      setChecked(checked.filter((item) => item !== number));
    } else if (raffleData.number_array[number] === undefined) {
      setChecked([...checked, number]);
    }
  }
  function removeChecked(number) {
    if (typeof number === "number") {
      if (checked.includes(number)) {
        setChecked(checked.filter((item) => item !== number));
      }
    } else if (Array.isArray(number)) {
      number.forEach((value) => {
        if (checked.includes(value)) {
          setChecked((checked) => checked.filter((item) => item !== value));
        }
      });
    }
  }
  function resetChecked() {
    setChecked([]);
  }

  const reserveNumbers = (clientData) =>
    api.post("/reservar.php", {
      ...clientData,
      raffle_id: raffleData.id,
      numbers: checked,
    });

  const [clientToken, setClientToken] = useState("");
  const [clientData, setClientData] = useState(null);

  function handleClientToken(token) {
    setClientToken(token);
    localStorage.setItem("AmoraToken", token);
  }

  useEffect(() => {
    let localToken = localStorage.getItem("AmoraToken");
    if (localToken) {
      api
        .get("/getClientNumbers.php?token=" + localToken)
        .then(({ data }) => {
          setClientNumbers(data.numbers);
          setClientData(data.client);
          handleClientToken(localToken);
        })
        .catch((err) => {
          setClientToken("");
          setClientData({
            name: "",
            cpf: "",
            phone: "",
          });
        });
    } else {
      setClientData({
        name: "",
        cpf: "",
        phone: "",
      });
      // setClientData({
      //   name: "Gustavo",
      //   cpf: "011.894.469-01",
      //   phone: "(49) 9.9960-6003",
      // });
    }
  }, []);

  const openFormButtonRef = useRef(null);


  return (
    <RaffleContext.Provider
      value={{
        raffleData,
        setRaffleData,
        checked,
        setChecked: handleChecked,
        removeChecked,
        resetChecked,
        reserveNumbers,
        clientNumbers,
        setClientNumbers,
        clientToken,
        setClientToken: handleClientToken,
        clientData,
        setClientData,
        openFormButtonRef,
      }}
    >
      {children}
    </RaffleContext.Provider>
  );
};
