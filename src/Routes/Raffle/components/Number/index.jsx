import { motion } from "framer-motion";
import { useContext } from "react";
import styled from "styled-components";
import RaffleContext from "../../../../context/RaffleContext";

function Number({ children, used, name, ...props }) {
  const { checked, setChecked, clientNumbers, clientData, removeChecked } =
    useContext(RaffleContext);

  const Animations = {
    initial: {
      rotateY: 0,
    },
    animate: {
      rotateY: 180,
    },
  };

  return (
    <NumberBox
      onClick={() => (!used ? setChecked(children) : removeChecked(children))}
    >
      <NumberContent
        variants={Animations}
        animate={checked.includes(children) ? "animate" : "initital"}
        {...props}
        checked={checked.includes(children)}
        clientChecked={clientNumbers.includes(children)}
        whileHover={
          checked.includes(children)
            ? { rotateY: 160, transition: { duration: 0.2 } }
            : { rotateY: 20, transition: { duration: 0.2 } }
        }
        used={used}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <NumberFront>
          {children}
          <Name>{name}</Name>
        </NumberFront>
        <NumberBack>{children}</NumberBack>
      </NumberContent>
    </NumberBox>
  );
}
export default Number;

const NumberBox = styled(motion.div)`
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;
  perspective: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NumberFront = styled.div`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  position: absolute;
  align-items: center;
`;
const NumberBack = styled.div`
  width: 100%;
  font-size: 1.6rem;
  font-weight: bold;

  height: 100%;
  position: absolute;

  backface-visibility: hidden;
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NumberContent = styled(motion.div)`
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.color.white};
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  display: flex;
  border: 1px solid ${({ theme }) => theme.color.mediumGray};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.main};
  position: absolute;
  top: 0;
  left: 0;
  transform-style: preserve-3d;
  ${({ theme, used }) =>
    used &&
    `
    background-color: ${theme.color.mediumGray};
    color: ${theme.color.gray};
    cursor: default;
    
    `}
  ${({ theme, checked }) =>
    checked &&
    `
    background-color: ${theme.color.main.complement};
    color: ${theme.color.white};
    `}
  ${({ theme, clientChecked }) =>
    clientChecked &&
    `
    background-color: ${theme.color.main.color};
    color: ${theme.color.white};
    `}
`;

const Name = styled.small`
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 0.8rem;
`;
