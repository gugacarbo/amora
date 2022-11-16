import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as TurnPhoneIcon } from "../../assets/turnPhone.svg";

function LandscapeChecker() {
  const [hidden, setHidden] = useState(0);
  return (
    <IfLandscape hidden={hidden} onClick={() => hidden && setHidden(0)}>
      <TurnPhoneIcon />
      <span>Por favor, vire o seu dispositivo para a posição vertical</span>
      <Hide hidden={hidden} onClick={() => setHidden(1)}>
        Não exibir novamente
      </Hide>
    </IfLandscape>
  );
}

export default LandscapeChecker;
const IfLandscape = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: ${({ theme }) => theme.color.main.medium};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  font-family: "Poppins";
  font-weight: 500;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.white};
  text-align: center;
  transition: ${({ theme }) => theme.transition.slow};
  transition-delay: 0.6s;
  svg {
    width: 10rem;
    height: 10rem;
    fill: ${({ theme }) => theme.color.white};
  }
  span {
    transition-delay: 1s;
    transition: ${({ theme }) => theme.transition.slow};
  }

  @media (orientation: portrait) or ((min-width: 800px)) {
    opacity: 0;
    transition-delay: 0s;

    pointer-events: none;
  }

  ${({ hidden, theme }) =>
    hidden &&
    `
    width: 5rem;
    height: 5rem;
    bottom: 0;
    opacity: 0.4;
  transition-delay: 0s;

   
    svg{
        width:50%;
        height: 50%;
    }
    span{
       display:none;
    }

  `}
`;

const Hide = styled.div`
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.color.lighterGray};
  ${({ hidden, theme }) =>
    hidden &&
    `
  transition: ${({ theme }) => theme.transition.slow};

        display:none;
    
  `}
`;
