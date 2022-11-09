import { motion } from "framer-motion";
import { useContext } from "react";
import styled from "styled-components";
import RaffleContext from "../../../../../context/RaffleContext";

function CancelBox({ number, raffleId, clientId, setCanceling, setConfirm }) {
  const { raffleData, cancelReserve, setClientNumbers } =
    useContext(RaffleContext);

  return (
    <CancelConfirm
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onMouseLeave={() => setConfirm(false)}
    >
      <span>Tem certeza que deseja cancelar a reserva?</span>
      <CancelButtons>
        <CancelButton
          sim
          onClick={() => {
            setCanceling(1);
            cancelReserve(number, clientId, raffleId)
            .then(({ data }) => {
              if (data.status >= 200 && data.status < 300) {
                  setCanceling(2);
                  setTimeout(() => {
                    setClientNumbers(data.numbers);
                  }, 300);
                } else {
                  setCanceling(0);
                  setConfirm(false);
                }
                return data;
              })
              .catch((e) => {
                setCanceling(0);
                setConfirm(false);
              });
          }}
        >
          Sim
        </CancelButton>
        <CancelButton
          onClick={() => {
            setConfirm(false);
          }}
        >
          Não
        </CancelButton>
      </CancelButtons>
    </CancelConfirm>
  );
}

export default CancelBox;

const CancelConfirm = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.color.main.dark + "da"};
  z-index: 10;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  color: ${({ theme }) => theme.color.white};
  font-family: "Gotham", sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
`;

const CancelButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const CancelButton = styled.button`
  width: 40%;
  height: 40px;
  border-radius: 10px;
  border: none;
  color: ${({ theme }) => theme.color.white};
  font-family: "Gotham", sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  background: ${({ theme }) => theme.color.main.light};
  transition: ${({ theme }) => theme.transition.main};
  &:hover {
    background: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.black};
  }

  ${({ sim, theme }) =>
    sim &&
    `
    color: ${theme.color.white};
    background: ${theme.color.main.darker};

    &:hover {
      color: ${theme.color.main.darker};
    }
  `}
`;
