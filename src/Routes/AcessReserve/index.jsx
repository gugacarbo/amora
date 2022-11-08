import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import Div100vh from "react-div-100vh";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import RaffleContext from "../../context/RaffleContext";
import api from "../../util/api";
import { useState } from "react";
import Loading from "../Loading";
import Form from "./components/Form";
function AcessReserve() {
  const {
    setClientData,
    setClientNumbers,
    clientData,
    clientToken,
    setClientToken,
  } = useContext(RaffleContext);

  const [IsAutenting, setIsAutenting] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (clientToken) {
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
          }
        })
        .catch((err) => {
          setIsAutenting(0);
        });
    } else {
      setIsAutenting(0);
    }
  }, [clientToken]);

  return (
    <AcessReserveContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{  duration: 0.3 }}
    >
      {IsAutenting == 1 && <Loading />}
      {IsAutenting == 0 && (
        <>
          <Header />
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
  background-color: ${({ theme }) => theme.background};
  overflow: hidden;
  display: grid;
  grid-template-rows: 10% auto;
  grid-template-columns: 1fr;
`;
