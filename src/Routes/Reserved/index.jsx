import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";

import RaffleContext from "../../context/RaffleContext";

import Header from "./components/Header";
import Ticket from "./components/Ticket";
import PayingHeader from "./components/PayingHeader";
import PayConfirm from "./components/PayConfirm";

import { ReactComponent as TicketSvg } from "../../assets/ticketIcon.svg";

function Reserved() {
  const {
    setClientData,
    clientNumbers,
    setClientNumbers,
    clientData,
    clientToken,
    setClientToken,
    raffleData,
    setBoughtNumbers,
    payMessage,
    setPayMessage,
  } = useContext(RaffleContext);

  const [paying, setPaying] = useState([]);
  const [goToPay, setGoToPay] = useState(false);
  const navigate = useNavigate();

  const handleSetPaying = (number) => {
    if (paying.includes(number)) {
      setPaying(paying.filter((item) => item != number));
    } else {
      setPaying([...paying, number]);
    }
  };

  if (!raffleData?.name || !clientData?.name) {
    return <Navigate to="/acessar" />;
  }

  return (
    <ReservedContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      isPaying={paying.length > 0}
    >
      <Header />

      <PayingHeader
        showHeader={paying.length > 0}
        closeHeader={() => setPaying([])}
        paying={paying}
      />
      {Object.keys(clientNumbers).length > 0 ? (
        <TicketsContainer>
          {Object.keys(clientNumbers).map((number) => (
            <Ticket
              key={number}
              number={number}
              data={clientNumbers[number]}
              text={"Prêmio: Bolo Artesanal"}
              paying={paying}
              setPaying={handleSetPaying}
            />
          ))}
        </TicketsContainer>
      ) : (
        <NoTickets>
          <span>Voce ainda não reservou nenhum número da rifa</span>
          <Link to="/rifa">
            <TicketSvg />
            <span>Confira os Números Disponíveis</span>
          </Link>
        </NoTickets>
      )}
      <PayButton
        initial={{ y: "200%" }}
        animate={paying.length > 0 ? { y: 0 } : { y: "200%" }}
        exit={{ y: "200%" }}
        transition={{ duration: 0.5 }}
        onClick={() => {
          if (payMessage) {
            setBoughtNumbers(paying.sort((a, b) => a - b));
            navigate("/rifa/reserva");
          } else {
            setGoToPay(true);
          }
        }}
      >
        Pagar
      </PayButton>
      <PayConfirm
        goToPay={goToPay}
        setGoToPay={setGoToPay}
        paying={paying}
        setPaying={setPaying}
        setBoughtNumbers={setBoughtNumbers}
        setPayMessage={setPayMessage}
      />
    </ReservedContainer>
  );
}
export default Reserved;

const ReservedContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
  overflow: hidden;
  display: grid;
  grid-template-rows: 7rem auto;
  grid-template-columns: 1fr;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    z-index: 3;
    pointer-events: none;
    transition: ${({ theme }) => theme.transition.slow};
  }

  ${({ isPaying }) =>
    isPaying &&
    `
  position: relative;
  &::before {
    opacity: 1;
  }
 
`}
`;

const TicketsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  overflow-y: auto;
  padding: 3rem 1rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10rem;
`;

const PayButton = styled(motion.div)`
  background-color: ${({ theme }) => theme.color.main.complement};

  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  transition: ${({ theme }) => theme.transition.slow};
  width: 70%;
  text-align: center;
  border: 1px solid transparent;
  margin: 0.5rem;
  position: absolute;
  bottom: 3rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 100;
  cursor: pointer;

  color: ${({ theme }) => theme.color.white};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.color.main.complement};
    background-color: ${({ theme }) => theme.color.white};
    border: 1px solid ${({ theme }) => theme.color.main.complement};
    box-shadow: 0 0 0.2rem 0.2rem ${({ theme }) => theme.color.main.complement};
  }
`;

const NoTickets = styled.div`
  width: 100%;
  margin-bottom: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  font-size: 1.5rem;
  font-family: "Poppins";
  color: ${({ theme }) => theme.color.main.dark};

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-decoration: none;
    margin-top: 3rem;
    font-size: 1.2rem;
    gap: 1rem;
    transition: ${({ theme }) => theme.transition.main};
    color: ${({ theme }) => theme.color.main.medium};
    svg {
      transition: ${({ theme }) => theme.transition.main};
      fill: ${({ theme }) => theme.color.main.color};
      width: 5rem;
    }
    &:hover {
      color: ${({ theme }) => theme.color.main.color};
      svg {
        fill: ${({ theme }) => theme.color.main.medium};
      }
    }
  }
`;
