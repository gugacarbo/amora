import Div100vh from "react-div-100vh";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";

import AnimatedRoutes from "./AnimatedRoutes";

function App() {
  return (
    <AppContainer>
      <Router>
        <AnimatedRoutes />
      </Router>
    </AppContainer>
  );
}

// const AppContainer = styled.div`
const AppContainer = styled(Div100vh)`
  width: 506.25px;
  height: 900px;
  position: relative;
  background-color: ${({ theme }) => theme.background};
  @media (max-width: 510px) {
    width: 100vw;
    height: 100vh;
  }
`;

export default App;
