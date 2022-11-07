import { motion } from "framer-motion";
import { useContext } from "react";
import styled from "styled-components";
import RaffleContext from "../../../../context/RaffleContext";
import Ticket from "./Ticket";
import { useHorizontalScroll } from "../../../../util/hooks";

 function Tickets() {
  const { boughtNumbers, raffleData, clientData } = useContext(RaffleContext);
  const horizontalScroll = useHorizontalScroll();

  return (
    <TicketContainer>
      <TicketTitle
        items={boughtNumbers.length}
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        exit={{ opacity: 0, x: "100%" }}
      >
        Seu{boughtNumbers.length > 1 ? "s" : ""} Número
        {boughtNumbers.length > 1 ? "s" : ""}
      </TicketTitle>
      <TicketsBox
        items={boughtNumbers.length}
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        exit={{ opacity: 0, x: "100%" }}
        ref={horizontalScroll}
      >
        {boughtNumbers.map((number) => (
          <Ticket key={number} number={number} text={clientData?.name} />
        ))}
      </TicketsBox>
    </TicketContainer>
  );
}
export default Tickets;
const TicketContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TicketsBox = styled(motion.div)`
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

const TicketTitle = styled(motion.h2)`
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
