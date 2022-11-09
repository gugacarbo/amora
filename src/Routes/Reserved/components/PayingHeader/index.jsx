import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import RaffleContext from "../../../../context/RaffleContext";

function PayingHeader({ showHeader, closeHeader, paying }) {
  const { raffleData } = useContext(RaffleContext);
  const [show, setShow] = useState(false);

  const PayingHeaderAnimations = {
    hidden: {
      opacity: 1,
      y: "-100%",
      transition: {
        duration: 0.5,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.4,
      },
    },
  };
  return (
    <PayingHeaderBox
      initial="hidden"
      animate={showHeader ? "visible" : "hidden"}
      variants={PayingHeaderAnimations}
      exit="exit"
    >
      <p>Selecione os números que deseja pagar</p>
      <Total>
        Total R${" "}
        <b>
          {(raffleData.number_price * paying.length)
            .toFixed(2)
            .replace(".", ",")}
        </b>
      </Total>
      <CancelButton onClick={closeHeader}>Desmarcar Todos</CancelButton>
    </PayingHeaderBox>
  );
}

export default PayingHeader;

const PayingHeaderBox = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;

  background: ${({ theme }) => theme.color.white + "ef"};
  border-bottom: 0.5rem solid ${({ theme }) => theme.color.green};
  padding: 2rem 0.5rem;
  padding-bottom: 0;
  display: grid;
  font-size: 1.2rem;
  row-gap: 1rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  place-items: center;

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    width: 90%;
    margin: 0.5rem 0;
    font-size: 1.4rem;
    text-align: center;
    grid-column: 1/3;
  }
`;

const Total = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color.darkerGray};
  b {
    color: ${({ theme }) => theme.color.main.dark};
  }
`;

const CancelButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.color.red};
  font-size: 1.2rem;
  z-index: 4;
  padding: 0.5rem;
  transition: ${({ theme }) => theme.transition.slow};
  cursor: pointer;
  padding: 0.3rem 1rem;
  border-radius: 0.3rem;
  &:hover {
    background-color: ${({ theme }) => theme.color.red + "ef"};
    color: ${({ theme }) => theme.color.white};
  }
`;
