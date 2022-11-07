import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import RaffleContext from "../../context/RaffleContext";

import Loading from "../Loading";
import Header from "./components/Header";
import Title from "./components/Title";
import Tickets from "./components/Tickets";
import Content from "./components/content";
import { useNavigate } from "react-router-dom";

function Reserve() {
  const { raffleData, clientData } = useContext(RaffleContext);
  const navigate = useNavigate();
  if (clientData?.name == "") navigate("/rifa");
  return (
    <ReserveContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0, duration: 0.5 }}
    >
      {raffleData?.name && clientData?.name ? (
        <>
          <Header />
          <Title />
          <Tickets />
          <Content />
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
  grid-template-rows: 10% auto auto auto 1fr 10%;
  place-items: center;
  overflow: hidden;
  position: relative;
`;

export default Reserve;
