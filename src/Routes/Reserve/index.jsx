import { useContext, useEffect, useRef, useState } from "react";
import RaffleContext from "../../context/RaffleContext";

import { QrCodePix } from "qrcode-pix";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Ticket from "./components/Ticket";
import Amora3 from "../../assets/Amora3.jpeg";
import { ReactComponent as QRIconSvg } from "../../assets/QRIcon.svg";
import Image from "../Home/components/Image";
import { useHorizontalScroll } from "../../util/hooks";
import Loading from "../Loading";
function Reserve() {
  const [qrData, setQrData] = useState();
  const { boughtNumbers, raffleData, clientData } = useContext(RaffleContext);
  const horizontalScroll = useHorizontalScroll();
  
  if (!raffleData?.name || !clientData?.name)
    return (
      <ReserveContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0, duration: 0.5 }}
      >
        <Loading />
      </ReserveContainer>
    );

  let message = `Rifa Da Amora Seu${
    boughtNumbers.length > 1 ? "s" : ""
  } Numero${boughtNumbers.length > 1 ? "s" : ""} ${boughtNumbers
    .sort((a, b) => a - b)
    .join(", ")}`;
  let transactionId =
    clientData.cpf.slice(0, 3) +
    "A" +
    boughtNumbers.sort((a, b) => a - b).join("n");
  console.log(transactionId);
  const qrCodePix = QrCodePix({
    version: "01",
    key: "03320312090", //or any PIX key
    name: "Nicole Mascarenhas",
    city: "Florianopolis",
    transactionId,
    message,
    // value: boughtNumbers.length * raffleData.number_price,
    value: 0.1,
  });

  qrCodePix.base64().then((base64) => {
    setQrData(base64);
  });

  return (
    <ReserveContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0, duration: 0.5 }}
    >
      <Header
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.5 }}
      >
        <BackButton to={-1}>{`^`}</BackButton>
        Reserva Concluída
      </Header>
      <Title
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        Obrigada {clientData.name}!
      </Title>
      <SubTitle
        items={boughtNumbers.length}
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        exit={{ opacity: 0, x: "100%" }}
      >
        Seu{boughtNumbers.length > 1 ? "s" : ""} Número
        {boughtNumbers.length > 1 ? "s" : ""}
      </SubTitle>
      <TicketBox
        items={boughtNumbers.length}
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        exit={{ opacity: 0, x: "100%" }}
        ref={horizontalScroll}
      >
        {boughtNumbers.map((number) => (
          <Ticket key={number} number={number} text={clientData.name} />
        ))}
      </TicketBox>
      <ReserveContent>
        <AmoraText>
          A Amora agradece a sua contribuição e deseja boa sorte! Au Au!
        </AmoraText>
        {/* <Qrcode src={qrData} /> */}
        {/* <input type="text" value={qrCodePix.payload()} onChange={() => {}} /> */}
      </ReserveContent>
    </ReserveContainer>
  );
}

const AmoraText = styled.div`
  font-size: 1.2rem;
  text-align: center;
  color: ${({ theme }) => theme.color.main.dark};
`;

const ReserveContent = styled.div`
  width: 95%;
  height: 95%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`;
const Qrcode = styled.img`
  height: 100%;
`;
const TicketBox = styled(motion.div)`
  width: 100%;
  display: grid;

  overflow-y: hidden;
  overflow-x: scroll;
  background-color: ${({ theme }) => theme.color.white};
  grid-template-columns: repeat(${(props) => props.items}, auto);
  padding: 0.5rem 0;
  padding-bottom: 0.2rem;
  ${({ items }) =>
    items > 2
      ? `
   grid-template-columns: repeat(${items}, 47%);	
   `
      : items == 2
      ? `
   grid-template-columns: repeat(${items}, 50%);	
    
  `
      : `
    grid-template-columns: 100%;
  padding-left:20%;
  padding-right:20%;
`}
`;

const Title = styled(motion.h4)`
  padding: 1rem 0;
  font-size: 2rem;
  color: ${({ theme }) => theme.color.main.dark};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const SubTitle = styled(motion.h2)`
  padding: 1rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.main.light};
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
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
const Header = styled(motion.h1)`
  font-size: 2rem;
  font-weight: 700;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.main.color};
  position: relative;
`;

const BackButton = styled(Link)`
  width: 2rem;
  height: 100%;
  color: ${({ theme }) => theme.color.main.color};
  position: absolute;
  top: 0rem;
  left: 0rem;
  padding: 0 2rem;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Reserve;
