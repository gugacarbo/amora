import Div100vh from "react-div-100vh";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";

import AnimatedRoutes from "./AnimatedRoutes";
import { ReactComponent as TurnPhoneIcon } from "./assets/turnPhone.svg";

function App() {
  return (
    <AppContainer>
      <AppContent>
        <Router>
          <AnimatedRoutes />
        </Router>
        <IfLandscape>
          <TurnPhoneIcon />
          <span>Por favor, vire o seu dispositivo para a posição vertical</span>
        </IfLandscape>
      </AppContent>
    </AppContainer>
  );
}

const IfLandscape = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
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
  transition-delay: 1.5s;
  svg {
    width: 10rem;
    height: 10rem;
    fill: ${({ theme }) => theme.color.white};
  }
  @media (orientation: portrait) or ((min-width: 800px)) {
    opacity: 0;
  transition-delay: 0s;

    pointer-events: none;
    }
`;

// const AppContainer = styled.div`
const AppContent = styled.div`
  width: 100%;
  max-width: 768px;
  height: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.background};
`;
const AppContainer = styled(Div100vh)`
  //background-color: ${({ theme }) => theme.background};
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export default App;
