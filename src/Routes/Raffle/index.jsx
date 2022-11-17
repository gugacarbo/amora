import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import RaffleContext from "../../context/RaffleContext";
import Form from "./components/Form";
import Legend from "./components/Legend";
import Number from "./components/Number";
import Loading from "../Loading";
import ColorLegend from "./components/ColorLegend";
import { ReactComponent as TicketIcon } from "../../assets/ticketIcon.svg";
import { ReactComponent as ArrowLeftIcon } from "../../assets/arrowLeft.svg";
import Prize from "./components/Prize";
import Error from "../Error";

function Raffle() {
  const { raffleData, checked, openFormButtonRef, getRifa } =
    useContext(RaffleContext);
  const [formModalOpen, setFormModalOpen] = useState(false);

  if (raffleData.error)
    return (
      <RaffleContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0, duration: 0.5 }}
      >
        <Error />
      </RaffleContainer>
    );

  if (!raffleData?.name)
    return (
      <RaffleContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0, duration: 0.5 }}
      >
        <Loading />
      </RaffleContainer>
    );

    
  var numbers = [];

  for (var i = 1; i <= raffleData.number_quantity; i++) {
    let used = raffleData.number_array[i] ? true : false;

    numbers.push(
      <Number
        key={i}
        number={i}
        used={used}
        name={raffleData?.number_array[i]?.name}
      >
        {i}
      </Number>
    );
  }

  return (
    <RaffleContainer
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ pacity: 1 }}
      transition={{ delay: 0, duration: 0.5 }}
    >
      <Title
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.5 }}
      >
        <BackButton to={"/"}>
          <ArrowLeftIcon />
          <small>Voltar</small>
        </BackButton>
        <ToRaffleButton to="/acessar">
          <TicketIcon />
          <small>Meus Bilhetes</small>
        </ToRaffleButton>
        Rifa da Amora
      </Title>
      <RaffleHeader
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        exit={{ x: "100%" }}
      >
        {checked.length === 0 ? (
          <HeaderMessage>
            Selecione os números que deseja reservar
          </HeaderMessage>
        ) : (
          <>
            <CheckedNumbersShow>
              {checked.length !== 0 && (
                // <p>{checked.sort((a, b) => a - b).join(", ")}</p>
                <p>
                  {checked.length} Número{checked.length > 1 ? "s" : ""}
                </p>
              )}
            </CheckedNumbersShow>
            <Total>
              Valor Total R${" "}
              {(checked.length * raffleData.number_price)
                .toFixed(2)
                .replace(".", ",")}
            </Total>
          </>
        )}
      </RaffleHeader>

      
    </RaffleContainer>
  );
}
export default Raffle;

const RaffleContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 7rem auto auto auto auto 1fr;
  place-items: center;
  position: relative;
  overflow: hidden;
`;

const RaffleHeader = styled(motion.div)`
  width: 90%;
  height: 100%;
  display: flex;
  font-size: 1.1rem;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 1rem 0;
  background-color: ${(props) => props.theme.color.white + "80"};
`;

const HeaderMessage = styled.h4`
  font-size: 1.2rem;
`;

const Title = styled(motion.h1)`
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

const CheckedNumbersShow = styled(motion.div)`
  width: 50%;
  display: flex;
  justify-content: center;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  align-items: center;
  color: ${({ theme }) => theme.color.main.darker};
  p {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.color.main.darker};
  }
`;

const Total = styled(CheckedNumbersShow)``;

const RaffleNumbers = styled(motion.div)`
  width: 90%;
  display: grid;
  grid-template-rows: auto;
  place-items: center;
  margin-bottom: auto;
  position: relative;
  border-collapse: collapse;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  z-index: 10;
  &::-webkit-scrollbar {
    width: 5px;
  }
  ${({ items, theme }) => {
    if (items < 25) {
      return `
      
          grid-template-columns: repeat(6, 1fr);
          
          @media (max-width: 800px) {
            grid-template-columns: repeat(5, 1fr);
          }
          `;
    } else if (items >= 25 && items < 35) {
      return `
      grid-template-columns: repeat(6, 1fr);
      @media (min-width: 800px) and (max-width: 1600px) {
          grid-template-columns: repeat(7, 1fr);
        }
      `;
    } else if (items >= 35 && items < 43) {
      return `grid-template-columns: repeat(7, 1fr);
        @media (min-width: 800px) and (max-width: 1600px) {
          grid-template-columns: repeat(8, 1fr);
        }
      `;
    } else if (items >= 43) {
      return `
        max-height: 50vh;
        overflow-x:hidden;
        overflow-y:scroll;
        border-top: 2px solid ${theme.color.lighter};
        border-left: 1px solid ${theme.color.main.lighter};
        border-right: 1px solid ${theme.color.main.lighter};
        grid-template-columns: repeat(7, 1fr);`;
    }
  }}
`;

const BackButton = styled(Link)`
  height: 100%;
  background-color: ${({ theme }) => theme.color.main.color};
  color: ${({ theme }) => theme.color.white};
  position: absolute;
  top: 0rem;
  left: 0rem;
  padding: 0 3rem;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: ${({ theme }) => theme.transition.main};
  svg {
    position: absolute;
    width: 2rem;
    height: 2rem;
    fill: ${({ theme }) => theme.color.white};
    transition: ${({ theme }) => theme.transition.main};
  }
  small {
    position: absolute;
    bottom: 0.5rem;
    width: 90%;
    font-size: 0.8rem;
    text-align: center;
    transition: ${({ theme }) => theme.transition.main};
  }
  &:hover {
    svg {
      fill: ${({ theme }) => theme.color.main.triad[1]};
    }
    small {
      color: ${({ theme }) => theme.color.main.triad[1]};
    }
  }
`;

const ToRaffleButton = styled(BackButton)`
  left: auto;
  right: 0;
  svg {
    width: 3.5rem;
  }
`;

const Button = styled(motion.div)`
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
  cursor: pointer;

  color: ${({ theme }) => theme.color.white};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.color.main.complement};
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.color.main.complement};
    box-shadow: 0 0 0.2rem 0.2rem ${({ theme }) => theme.color.main.complement};
  }

  ${({ disabled, theme }) =>
    disabled &&
    `
      background-color: ${theme.color.lightGray};
      filter: opacity(0.7) grayscale(100%);
      pointer-events: none;
    `}
`;
