import Div100vh from "react-div-100vh";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";

import AnimatedRoutes from "./AnimatedRoutes";
import LandscapeChecker from "./util/LandscapeChecker";

function App() {
  return (
    <AppContainer>
      <AppContent>
        <Router>
          <AnimatedRoutes />
        </Router>
        <LandscapeChecker />
      </AppContent>
    </AppContainer>
  );
}

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
