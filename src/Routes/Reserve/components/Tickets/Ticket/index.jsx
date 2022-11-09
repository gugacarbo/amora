import { useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as TicketSvg } from "../../../../../assets/Ticket.svg";

function Ticket({ number, text }) {
  const ticketRef = useRef();
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

  return (
    <TicketContainer ref={ticketRef}>
      <TicketSvg />
    </TicketContainer>
  );
}

const TicketContainer = styled.div`
  width: 100%;
     

  svg {
    width: 100%;
    height: 100%;
  }
`;

export default Ticket;
