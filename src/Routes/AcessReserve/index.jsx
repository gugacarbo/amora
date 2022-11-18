import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import RaffleContext from "../../context/RaffleContext";
import api from "../../util/api";
import { useState } from "react";
import Loading from "../Loading";
import Form from "./components/Form";
import Error from "../../Routes/ErrorMessage";

function AcessReserve() {
  const {
    setClientData,
    setClientNumbers,
    clientData,
    clientToken,
    setClientToken,
    setErrorMessage,
  } = useContext(RaffleContext);

  const [IsAutenting, setIsAutenting] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (clientToken != "" && clientToken != null) {
      setIsAutenting(1);

      api
        .get("/getClientNumbers.php?token=" + clientToken)
        .then(({ data }) => {
          if (data.status >= 200 && data.status < 300) {
            setClientNumbers(data.numbers);
            setClientData(data.client);
            setIsAutenting(1);
            navigate("/reservados");
          } else {
            setIsAutenting(0);
            setClientToken("");
          }
        })
        .catch((err) => {
          setIsAutenting(0);
          setClientToken("");
        });
    } else {
      setIsAutenting(0);
      setClientToken("");
    }
  }, [clientToken]);

  return (
    <AcessReserveContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {IsAutenting == 1 && <Loading />}
      {IsAutenting == 0 && (
        <>
          <Header />
          <Error />
          <Form />
        </>
      )}
    </AcessReserveContainer>
  );
}

export default AcessReserve;

const AcessReserveContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows: 10% auto;
  grid-template-columns: 1fr;
`;
