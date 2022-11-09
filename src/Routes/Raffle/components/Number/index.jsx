import { motion } from "framer-motion";
import { useContext } from "react";
import styled from "styled-components";
import RaffleContext from "../../../../context/RaffleContext";

import { ReactComponent as PawSvg } from "../../../../assets/paw.svg";

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
        clientChecked={
          clientNumbers[children] && clientNumbers[children].status
        }
        used={used}
        transition={{ duration: 0.5 }}
      >
        <NumberFront
          checked={checked.includes(children)}
          clientChecked={
            clientNumbers[children] && clientNumbers[children].status
          }
          used={used}
        >
          {children}
          <Name>
            {clientNumbers[children] && clientNumbers[children].status
              ? clientData?.name
              : name}
          </Name>
        </NumberFront>
        <NumberBack
          checked={checked.includes(children)}
          clientChecked={
            clientNumbers[children] && clientNumbers[children].status
          }
          used={used}
        >
          {children}
          <Name>{clientData?.name}</Name>
          <PawBackground />
        </NumberBack>
      </NumberContent>
    </NumberBox>
  );
}
export default Number;

const PawBackground = styled(PawSvg)`
  position: absolute;
  width: 80%;
  fill: ${({ theme }) => theme.color.lighterGray};
  z-index: -1;
  transform: rotate(-30deg);
`;

const NumberBox = styled(motion.div)`
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;

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
  transform: translateZ(5px);

  background-color: ${({ theme }) => theme.color.white};

  ${({ theme, used }) =>
    used &&
    `
      background-color: ${theme.color.lightGray};
      color: ${theme.color.mediumGray};
      cursor: default;
    
    `}

  ${({ theme, clientChecked }) => {
    switch (clientChecked) {
      case 1:
        return `
        background-color: ${theme.color.blue};
        color: ${theme.color.white};
        font-size: 1.8rem;
        `;
      case 2:
        return `
          background-color: ${theme.color.main.complement};
          color: ${theme.color.white};
        font-size: 1.8rem;

        `;
    }
  }}
`;

const NumberBack = styled.div`
  width: 100%;
  font-size: 2rem;
  font-weight: bold;

  height: 100%;
  position: absolute;

  backface-visibility: hidden;
  transform: rotateY(180deg) translateZ(3px);
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.color.main.triad[1]};
  color: ${({ theme }) => theme.color.black};
`;

const NumberContent = styled(motion.div)`
  width: 100%;
  height: 100%;

  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  display: flex;
    border: 0.01rem solid ${({ theme }) => theme.color.lightGray};
  
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.main};
  position: absolute;
  top: 0;
  left: 0;
  transform-style: preserve-3d;
`;

const Name = styled.small`
  position: absolute;
  bottom: 0.2rem;
  left: 0.2rem;
  font-size: 0.8rem;
`;
