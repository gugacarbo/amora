import { useEffect, useRef, useContext, useState } from "react";
import styled from "styled-components";

import RaffleContext from "../../../../context/RaffleContext";
import { motion } from "framer-motion";
import CancelBox from "./CancelBox";
import { ReactComponent as TicketSvg } from "../../../../assets/Ticket.svg";
import Info from "./Info";

function Ticket({ number, text, data, paying, setPaying }) {
  const { raffleData, cancelReserve } = useContext(RaffleContext);
  const ticketRef = useRef();
  const [canceling, setCanceling] = useState(0);
  const [confirm, setConfirm] = useState(false);

  const getStatus = () => {
    switch (data.status) {
      case 1:
        return "Aguardando Pagamento";
      case 2:
        return "Pago";
    }
  };

  useEffect(() => {
    if (ticketRef.current) {
      const ticketNumber = ticketRef.current.querySelector("#Layer_5");
      const ticketText = ticketRef.current.querySelector("#OptText");

      ticketNumber.querySelector("text").innerHTML = number;
      ticketText.innerHTML = text ?? "";
      if (number < 10) {
        ticketNumber.style.transform = "translateX(5%)";
      }
    }
  }, [number]);

  const handleCancelBox = () => {
    setConfirm(true);
    const t = setTimeout(() => {
      setConfirm(false);
    }, 6000);
    return () => clearTimeout(t);
  };

  useEffect(() => {
    if (confirm) {
      return handleCancelBox();
    }
  }, [confirm]);

  const TicketAnimation = {
    hidden: {
      x: ["0vw", "100vw", "100vw"],
      opacity: [1, 0, 0],
      height: ["8rem", "5rem", "3rem"],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    visible: {
      x: 0,
      opacity: [0, 1, 1],
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
    delete: {
      x: ["100vw", "100vw", "100vw"],
      opacity: [1, 0, 0],
      height: ["5rem", "0rem", "0rem"],
      padding: ["0.5rem", "0rem", "0rem"],
      transition: {
        duration: 0.2,
        delay: 0,
      },
    },
  };

  return (
    <TicketContainer
      status={getStatus()}
      variants={TicketAnimation}
      initial="hidden"
      animate={
        canceling == 0 ? "visible" : canceling == 1 ? "hidden" : "delete"
      }
      exit="hidden"
      paying={paying.length > 0 ? 1 : 0}
      ispaying={paying.includes(number) ? 1 : 0}
      onClick={() => {
        if (paying.length > 0 && getStatus() != "Pago") {
          setPaying(number);
        }
      }}
    >
      <TicketContent ref={ticketRef}>
        <TicketSvg />
      </TicketContent>
      <Info
        data={data}
        number={number}
        status={getStatus()}
        setConfirm={setConfirm}
        setPaying={setPaying}
        paying={paying.length > 0 ? 1 : 0}
        ispaying={paying.includes(number) ? 1 : 0}
      />
      {confirm && (
        <CancelBox
          number={number}
          clientId={data.id}
          raffleId={raffleData.id}
          setCanceling={setCanceling}
          setConfirm={setConfirm}
        />
      )}
    </TicketContainer>
  );
}

const TicketContainer = styled(motion.div)`
  width: 100%;

  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 1fr;
  place-items: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.color.main.complement};
  position: relative;
  transition: ${({ theme }) => theme.transition.slow};

  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);

  ${({ status, theme }) => {
    return status === "Pago"
      ? `
      order: -1;
      z-index: 1;
      `
      : `
      order: 1;
      z-index: 5;
      border: 2px solid ${theme.color.main.triad[0]};
    `;
  }}

  ${({ status, paying, ispaying, theme }) => {
    if (status != "Pago" && paying)
      return ispaying
        ? `
        cursor: pointer;
        border: 2px solid ${theme.color.green};
        `
        : `
        cursor: pointer;

          filter: opacity(0.8);
      `;
  }}
`;
const TicketContent = styled.div`
  width: 100%;
  height: 100%;
  svg {
    width: 100%;
    height: 100%;
  }
`;

export default Ticket;
