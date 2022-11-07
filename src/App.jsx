import Div100vh from "react-div-100vh";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";

import AnimatedRoutes from "./AnimatedRoutes";

function App() {
  return (
    <AppContainer>
      <AppContent>
        <Router>
          <AnimatedRoutes />
        </Router>
      </AppContent>
    </AppContainer>
  );
}

// const AppContainer = styled.div`
const AppContent = styled.div`
  width: 100%;
  max-width: 506.25px;
  height: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.background};
  @media (max-width: 510px) {
    width: 100vw;
    height: 100vh;
  }
`;
const AppContainer = styled(Div100vh)`
  //background-color: ${({ theme }) => theme.background};
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
