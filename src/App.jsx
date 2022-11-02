import Div100vh from "react-div-100vh";
import styled from "styled-components";
import Amora1 from "./assets/Amora1.jpeg";
import Amora2 from "./assets/Amora2.jpeg";

function App() {
  return (
    <AppContainer>
      <Title>Olá eu sou a Amora</Title>
      <ImageContainer>
        <img src={Amora2} alt="Amora" />
      </ImageContainer>
    </AppContainer>
  );
}

//const AppContainer = styled(Div100vh)`
const AppContainer = styled.div`
  width: 506.25px;
  height: 900px;
  background-color: ${({ theme }) => theme.background};
`;

const ImageContainer = styled.div`
  width: 50%;
  background-color: ${({ theme }) => theme.background};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.color.main.color};
  text-align: center;
`;
export default App;
