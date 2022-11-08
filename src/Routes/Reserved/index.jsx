import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import RaffleContext from "../../context/RaffleContext";
import api from "../../util/api";
import { useState } from "react";
import Loading from "../Loading";

function Reserved() {
  const {
    setClientData,
    clientNumbers,
    setClientNumbers,
    clientData,
    clientToken,
    setClientToken,
  } = useContext(RaffleContext);

  const navigate = useNavigate();

  return (
    <ReservedContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <Header />
      {Object.keys(clientNumbers).map((number) => (
        <Number key={number}>{number}</Number>
      ))}
    </ReservedContainer>
  );
}
export default Reserved;
const Number = styled.div``;

const ReservedContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
  overflow: hidden;
  display: grid;
  grid-template-rows: 10% auto;
  grid-template-columns: 1fr;
`;
