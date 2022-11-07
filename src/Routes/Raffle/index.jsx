import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import RaffleContext from "../../context/RaffleContext";
import Form from "./components/Form";
import Legend from "./components/Legend";
import Number from "./components/Number";
import Loading from "../Loading";

function Raffle() {
  const { raffleData, checked, openFormButtonRef } = useContext(RaffleContext);
  const [formModalOpen, setFormModalOpen] = useState(false);

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
        <BackButton to={-1}>{`<`}</BackButton>
        Rifa da Amora
      </Title>
      <RaffleHeader
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        exit={{ x: "100%" }}
      >
        {checked.length === 0 ? (
          <p>Selecione os números que deseja reservar</p>
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

      <RaffleNumbers
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        exit={{ opacity: 0, scale: 0.7 }}
      >
        {numbers.map((number) => {
          return number;
        })}
      </RaffleNumbers>
      <Legend />
      <Button
        ref={openFormButtonRef}
        onClick={() => setFormModalOpen((x) => !x)}
        disabled={checked.length === 0}
        initial={{ y: "200%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        exit={{ y: "200%", opacity: 0 }}
      >
        Reservar
      </Button>
      <Form open={formModalOpen} setOpen={setFormModalOpen} />
    </RaffleContainer>
  );
}

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

const RaffleHeader = styled(motion.div)`
  width: 90%;
  height: 100%;
  display: flex;
  font-size: 1.1rem;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const RaffleNumbers = styled(motion.div)`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(5, 20%);
  grid-template-rows: auto;
  place-items: center;
  overflow: auto;
  margin-top: auto;
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;
  border-collapse: collapse;
  padding-bottom: 1rem;
`;

const RaffleContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5rem 4rem 1fr auto 15rem;
  place-items: center;
  overflow: hidden;
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
const BackButton = styled(Link)`
  width: 2rem;
  height: 100%;
  background-color: ${({ theme }) => theme.color.main.color};
  color: ${({ theme }) => theme.color.white};
  position: absolute;
  top: 0rem;
  left: 0rem;
  padding: 0 2rem;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Raffle;
