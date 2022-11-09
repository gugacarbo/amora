import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import RaffleContext from "../../context/RaffleContext";

import Loading from "../Loading";
import Header from "./components/Header";
import Title from "./components/Title";
import Tickets from "./components/Tickets";
import ReserveContent from "./components/ReserveContent";
import { useNavigate } from "react-router-dom";

function Reserve() {
  const { raffleData, clientData, boughtNumbers } = useContext(RaffleContext);
  const navigate = useNavigate();
  if (clientData?.name == "") navigate("/rifa");
  useEffect(() => {
    if (boughtNumbers.length == 0) {
      navigate("/rifa");
    }
  }, [boughtNumbers]);
  return (
    <ReserveContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      {raffleData?.name && clientData?.name ? (
        <>
          <Header />
          <Title />
          <Tickets />
          <ReserveContent />
        </>
      ) : (
        <Loading />
      )}
    </ReserveContainer>
  );
}

const ReserveContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows:  auto auto auto 1fr;
  place-items: center;
  overflow: hidden;
  position: relative;
  place-items: center;
`;

export default Reserve;
