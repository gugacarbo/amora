import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";

import Home from "./Routes/Home";
import Raffle from "./Routes/Raffle";

function App() {
  return (
    <AppContainer>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rifa" element={<Raffle />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </AppContainer>
  );
}

//const AppContainer = styled(Div100vh)`
const AppContainer = styled.div`
  width: 506.25px;
  height: 900px;
  background-color: ${({ theme }) => theme.background};
`;

export default App;
