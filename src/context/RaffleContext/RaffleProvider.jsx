import api from "../../util/api";
import { useEffect, useState, useRef } from "react";

import RaffleContext from "./index";

export default ({ children }) => {
  const [raffleData, setRaffleData] = useState({});
  const [checked, setChecked] = useState([]);
  const [clientNumbers, setClientNumbers] = useState({});

  function getRifa() {
    api
      .get("/getRifa.php")
      .then(({ data }) => {
        if (data.status == 200) {
          setRaffleData(data.data);
        } else {
          setRaffleData({ error: data.status });
        }
      })
      .catch((e) => {
        setRaffleData({ error: e.code });
      });
  }

  useEffect(() => {
    getRifa();
  }, []);

  useEffect(() => {
    if (raffleData.error) {
      const timer = setTimeout(() => {
        getRifa();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [raffleData]);

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

  const [clientToken, setClientToken] = useState(null);
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
          if (data.status >= 200 && data.status < 300) {
            setClientNumbers(data.numbers);
            setClientData(data.client);
            handleClientToken(localToken);
          } else {
            handleClientToken("");
            setClientData({
              name: "",
              lastName: "",
              cpf: "",
              phone: "",
            });
          }
        })
        .catch((err) => {
          handleClientToken("");
          setClientData({
            name: "",
            lastName: "",
            cpf: "",
            phone: "",
          });
        });
    } else {
      setClientData({
        name: "",
        lastName: "",
        cpf: "",
        phone: "",
      });
    }
  }, []);

  const openFormButtonRef = useRef(null);

  const [boughtNumbers, setBoughtNumbers] = useState([]);
  function resetClientData() {
    setClientToken("");

    setClientNumbers({});
    setBoughtNumbers([]);

    setClientData({
      name: "",
      lastName: "",
      cpf: "",
      phone: "",
    });
    localStorage.removeItem("AmoraToken");
  }

  const cancelReserve = (number, clientId, raffleId) =>
    api.post("/cancelar.php", {
      number,
      clientId: clientId,
      raffleId: raffleId,
      token: clientToken,
    });

  const [payMessage, setPayMessage] = useState(false);

  function handlePayMessage(message) {
    setPayMessage(message ? true : false);
  }

  const [showPrize, setShowPrize] = useState(false);
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
        boughtNumbers,
        setBoughtNumbers,
        getRifa,
        resetClientData,
        cancelReserve,
        payMessage,
        setPayMessage: handlePayMessage,
        showPrize,
        setShowPrize,
      }}
    >
      {children}
    </RaffleContext.Provider>
  );
};
