import { useEffect, useRef, useContext, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as TicketSvg } from "../../../../assets/Ticket.svg";
import { ReactComponent as XSvg } from "../../../../assets/x.svg";
import { ReactComponent as CoinsSvg } from "../../../../assets/coins.svg";
import api from "../../../util/api";

function Ticket({ number, text, data, raffleTimeout, raffleId, refresh }) {
  function handlePay() {
    api
      .post("aprovarPagamento.php", {
        number,
        clientId: data.id,
        raffleId,
        adminUser: "gugacarbo",
        token: 1111,
      })
      .then(({ data }) => {
        alert(data.message);
      })
      .catch((data) => {
        alert("Ocorreu um Erro");
        refresh();
      })
      .finally(() => {
        refresh();
      });
  }
  function handlePayBack() {
    api
      .post("cancelarPagamento.php", {
        number,
        clientId: data.id,
        raffleId,
        adminUser: "gugacarbo",
        token: 1111,
      })
      .then(({ data }) => {
        alert(data.message);
      })
      .catch((data) => {
        alert("Ocorreu um Erro");
        refresh();
      })
      .finally(() => {
        refresh();
      });
  }
  function handleCancel() {
    api
      .post("cancelar.php", {
        number,
        clientId: data.id,
        raffleId,
        adminUser: "gugacarbo",
        token: 1111,
      })
      .then(({ data }) => {
        alert(data.message);
      })
      .catch((data) => {
        alert("Ocorreu um Erro");
        refresh();
      })
      .finally(() => {
        refresh();
      });
  }

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

  const TicketAnimation = {
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
    delete: {
      x: "100vw",
      opacity: 0,
      maxHeight: "0rem",
      padding: "0rem",
      transition: {
        duration: 0.2,
        delay: 0,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  var D = new Date(data.reserveTime);
  const date = {
    day: D.getDate(),
    month: D.getMonth() + 1,
    year: D.getFullYear(),
    hour: D.getHours(),
    minute: D.getMinutes(),
  };
  date.day = date.day < 10 ? "0" + date.day : date.day;
  date.month = date.month < 10 ? "0" + date.month : date.month;
  date.hour = date.hour < 10 ? "0" + date.hour : date.hour;
  date.minute = date.minute < 10 ? "0" + date.minute : date.minute;

  var E = new Date(data.reserveTime + raffleTimeout * 1000);
  const Edate = {
    day: E.getDate(),
    month: E.getMonth() + 1,
    year: E.getFullYear(),
    hour: E.getHours(),
    minute: E.getMinutes(),
  };
  Edate.day = Edate.day < 10 ? "0" + Edate.day : Edate.day;
  Edate.month = Edate.month < 10 ? "0" + Edate.month : Edate.month;
  Edate.hour = Edate.hour < 10 ? "0" + Edate.hour : Edate.hour;
  Edate.minute = Edate.minute < 10 ? "0" + Edate.minute : Edate.minute;

  var color = "yellow";
  const H = new Date();
  const interval = E - H;
  const intervalH = parseInt(interval / 3600000);
  const intervalM = parseInt((interval % 3600000) * 60);
  const expiring = intervalH < 5 ? 1 : 0;
  const expired = intervalH < 0 ? 1 : 0;
  if (expiring) {
    color = "blue";
  }

  var pos = 1;
  if (expired) {
    pos = 3;
    color = "red";
  }
  if (data.status == 2) {
    pos = 5;
    color = "green";
  }

  return (
    <TicketContainer
      status={getStatus()}
      variants={TicketAnimation}
      initial="visible"
      animate={canceling == 0 ? "visible" : "delete"}
      exit="exit"
      color={color}
      pos={pos}
    >
      <TicketContent ref={ticketRef}>
        <TicketSvg />
        <RaffleIcon to="/rifa">Ver Rifa</RaffleIcon>
      </TicketContent>
      <Info>
        <Name>
          {data.name} - {data.cpf}
        </Name>
        <DateBox expiring={expiring} payd={data.status == 2}>
          <small>Reservado de</small>
          <span>
            {date.day}/{date.month} {date.hour}:{date.minute}
          </span>
          <small>até</small>
          <span>
            {Edate.day}/{Edate.month} {Edate.hour}:{Edate.minute}
          </span>
        </DateBox>
        <StatusBar payd={data.status == 2}>
          <Icon
          payd={data.status == 2}
            onClick={() => {
              console.log("cancelar");
              handleCancel();
            }}
          >
            <XSvg className="x" />
            <span>Cancelar</span>
          </Icon>
          {data.status == 2 ? (
            <Icon
              onClick={() => {
                handlePayBack();
                console.log("cancelar pagamento");
              }}
            >
              <CoinsSvg className="c" />
              <span>Cancelar Pagamento</span>
            </Icon>
          ) : (
            <Icon
              onClick={() => {
                console.log("pago");
                handlePay();
              }}
            >
              <CoinsSvg className="c" />
              <span> Pago</span>
            </Icon>
          )}
        </StatusBar>
      </Info>
    </TicketContainer>
  );
}
const Info = styled.div`
  display: grid;
  width: 95%;
  height: 90%;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 25% 25% 25% 25%;
  place-items: center;
  margin-left: auto;
`;
const Name = styled.span`
  grid-column: 1/4;
`;
const DateBox = styled.div`
  grid-row: 2/5;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: ${({ expiring, theme }) =>
    expiring ? theme.color.red : theme.color.black};
  display: ${({ payd }) => payd && `none`};

  span {
    font-size: 1rem;
    text-align: center;
  }
  small {
    text-align: center;
    font-size: 0.7rem;
  }
`;

const StatusBar = styled.div`
  grid-row: 2/5;

  grid-column: 2/4;
  grid-column: ${({ payd }) => payd && `1/4`};
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;
  place-items: center;
`;

const Icon = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 70% 30%;
  place-items: center;
  cursor: pointer;
  text-align: center;

  svg {
    height: 2rem;
  }
  .x {
    fill: ${({ theme, payd }) => payd? theme.color.gray :  theme.color.red};
  }
  .c {
    fill: ${({ theme }) => theme.color.yellowGold};
  }
`;

const TicketContainer = styled(motion.div)`
  width: 100%;
  aspect-ratio: 2;
  display: grid;
  grid-template-columns: 30% 70%;
  place-items: center;

  grid-template-rows: 1fr;
  max-height: 15rem;
  padding: 0.5rem 1rem;

  order: ${({ pos }) => pos};
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 10px;
  border: 2px solid
    ${({ theme, color }) =>
      theme.color[color] ? theme.color[color] : theme.color.main.complement};
  position: relative;
  transition: ${({ theme }) => theme.transition.slow};

  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;
const TicketContent = styled.div`
  width: 100%;
  aspect-ratio: 2;
  position: relative;
  overflow: visible;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const RaffleIcon = styled(Link)`
  position: absolute;
  bottom: -1.5rem;
  font-size: 0.9rem;
  text-decoration: none;
  color: ${({ theme }) => theme.color.main.dark};
  transition: ${({ theme }) => theme.transition.main};
  &:hover {
    color: ${({ theme }) => theme.color.main.complement};
  }
`;

export default Ticket;
