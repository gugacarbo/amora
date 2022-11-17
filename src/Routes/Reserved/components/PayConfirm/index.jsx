import { motion } from "framer-motion";
import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import RaffleContext from "../../../../context/RaffleContext";

function PayConfirm({ paying, setPaying, setGoToPay, goToPay }) {
  const navigate = useNavigate();
  const noShowMessageCheckbox = useRef(null);
  const { setBoughtNumbers, setPayMessage, payMessage } =
    useContext(RaffleContext);

  const PayConfirmAnimation = {
    hidden: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      borderRadius: "10rem",
      scale: 0.5,
      opacity: 0,
    },
    visible: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "0rem",

      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <PaymentConfirm
      variants={PayConfirmAnimation}
      initial={{ opacity: 0, transition: { duration: 0.001 } }}
      animate={!payMessage ? (goToPay ? "visible" : "hidden") : { opacity: 0 }}
      visible={goToPay}
      exit={
        goToPay ? "hidden" : { opacity: 0, transition: { duration: 0.001 } }
      }
    >
      <PayConfirmBox>
        <h2>Atenção</h2>
        <p>
          Caso já tenha efetuado o pagamento dos seus bilhetes, aguarde que logo
          atualizaremos as informações da rifa!
        </p>
        <DontShowBox>
          <span>Não mostrar esse aviso novamente</span>
          <input type="checkbox" ref={noShowMessageCheckbox} />
        </DontShowBox>
        <Buttons>
          <button
            onClick={() => {
              setGoToPay(false);
              setPaying([]);
            }}
          >
            Voltar
          </button>
          <button
            onClick={() => {
              setPayMessage(noShowMessageCheckbox.current.checked);
              setBoughtNumbers(paying.sort((a, b) => a - b));
              navigate("/rifa/reserva");
            }}
          >
            Continuar
          </button>
        </Buttons>
      </PayConfirmBox>
    </PaymentConfirm>
  );
}

export default PayConfirm;

const PaymentConfirm = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 300;
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ visible }) =>
    visible ? "pointer-events: all" : "pointer-events:  none"}
`;

const PayConfirmBox = styled(motion.div)`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 4rem;
  color: ${({ theme }) => theme.color.black};
  font-family: "Poppins";
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 15px;
  text-align: center;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.color.main.medium};
  box-shadow: 0px 0px 10px 0px ${({ theme }) => theme.color.main.medium},
    1px 1px 10px 2px rgba(0, 0, 0, 0.7);
  h2 {
    font-size: 1.8rem;
    width: 90%;
  }
  p {
    width: 90%;
    font-size: 1.1rem;
    margin: 2rem 0;
  }
`;

const DontShowBox = styled.label`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  gap: 0.5rem;
  input {
    width: 1rem;
    height: 1rem;
    accent-color: ${({ theme }) => theme.color.main.medium};
  }
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.main.light};
  button {
    width: 50%;
    padding: 1rem;
    border: none;
    background-color: transparent;
    font-size: 1.1rem;

    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;

    background-color: ${({ theme }) => theme.color.main.medium};
    color: ${({ theme }) => theme.color.white};
    &:hover {
      color: ${({ theme }) => theme.color.main.darker};
      background-color: ${({ theme }) => theme.color.main.light};
    }
  }
`;
