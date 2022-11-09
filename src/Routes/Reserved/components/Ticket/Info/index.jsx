import { motion } from "framer-motion";
import styled from "styled-components";

import { ReactComponent as XSvg } from "../../../../../assets/x.svg";
import { ReactComponent as LogoSvg } from "../../../../../assets/logoColor.svg";
import { ReactComponent as CoinsSvg } from "../../../../../assets/coins.svg";

import RaffleContext from "../../../../../context/RaffleContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Info({
  data,
  status,
  setConfirm,
  setPaying,
  number,
  ispaying,
  paying,
}) {
  const { raffleData } = useContext(RaffleContext);

  var D = new Date(data.reserveTime * 1000);
  const date = {
    day: D.getDate(),
    month: D.getMonth(),
    year: D.getFullYear(),
    hour: D.getHours(),
    minute: D.getMinutes(),
  };

  var ET = new Date(data.reserveTime * 1000 + raffleData.reserveTimeout * 1000);
  const expireTime = {
    day: ET.getDate(),
    month: ET.getMonth(),
    year: ET.getFullYear(),
    hour: ET.getHours(),
    minute: ET.getMinutes(),
  };

  return (
    <TicketInfo>
      {status === "Pago" ? (
        <ReservedIn>
          <span>Reservado em</span>
          <span>
            {date.day}/{date.month}/{date.year}
          </span>
        </ReservedIn>
      ) : (
        <ReservedTo>
          <span>Reservado até</span>
          <span>
            {expireTime.day}/{expireTime.month}/{expireTime.year}-
            {expireTime.hour}:{expireTime.minute < 10 ? "0" : ""}
            {expireTime.minute}
          </span>
        </ReservedTo>
      )}
      {status != "Pago" ? (
        <Status>{status}</Status>
      ) : (
        <Status>
          <span>Au Au!</span>
          <span>Boa sorte</span>
        </Status>
      )}

      {status === "Pago" ? (
        <Icons style={{ gridColumn: "1/2", gridRow: "1/3" }}>
          <LogoIcon />
        </Icons>
      ) : (
        <Icons>
          <Icon
            onClick={() => {
              if (!paying) {
                setConfirm(true);
              }
            }}
          >
            <XIcon paying={paying} />
            <small>Cancelar </small>
          </Icon>
          <Icon
            onClick={() => {
              setPaying(number);
            }}
          >
            <CoinsIcon ispaying={ispaying} paying={paying} />
            <small>Pagar</small>
          </Icon>
        </Icons>
      )}
    </TicketInfo>
  );
}

export default Info;

const TicketInfo = styled.div`
  width: 100%;
  height: 100%;

  padding: 0.3rem;
  color: ${({ theme }) => theme.color.black};
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  place-items: center;
`;

const ReservedIn = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: cemter;
  justify-content: center;
  grid-column: 2/3;
`;
const ReservedTo = styled(ReservedIn)`
  grid-column: 1/2;
`;
const Status = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Icons = styled.div`
  width: 100%;
  height: 100%;
  grid-column: 1/3;
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
  svg {
    cursor: pointer;
  }
`;

const Icon = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 0.5fr;
  transition: ${({ theme }) => theme.transition.slow};

  small {
    font-size: 1rem;
    transition: ${({ theme }) => theme.transition.slow};
  }
`;

const XIcon = styled(XSvg)`
  width: 1.7rem;
  height: 1.7rem;
  fill: ${({ theme }) => theme.color.red};
  transition: ${({ theme }) => theme.transition.slow};

  ${({ paying, theme }) =>
    paying &&
    `
        fill: ${theme.color.lightGray};
        &+small{
          opacity: 0.2;
        }
        `}
`;

const CoinsIcon = styled(CoinsSvg)`
  width: 2.2rem;
  height: 2.2rem;
  fill: ${({ theme }) => theme.color.yellowGold};
  stroke: ${({ theme }) => theme.color.yellow};
  transition: ${({ theme }) => theme.transition.slow};
  overflow: visible;
  stroke-width: 3px;
  ${({ ispaying, paying, theme }) => {
    if (paying) {
      return ispaying
        ? `
        fill: ${theme.color.green};

        `
        : `
        fill: ${theme.color.gray};
      `;
    }
  }}
`;
const LogoIcon = styled(LogoSvg)`
  width: 3.5rem;
  height: 3.5rem;
  grid-column: 1/3;
`;
