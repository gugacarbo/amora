import { motion } from "framer-motion";
import Div100vh from "react-div-100vh";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Amora1 from "../../assets/Amora1.jpeg";
import Amora2 from "../../assets/Amora2.jpeg";

function Home() {
  return (
    <HomeContainer>
      <Title>Olá eu sou a Amora</Title>
      <ImageContainer>
        <img src={Amora2} alt="Amora" />
      </ImageContainer>
      <Link to="/rifa">Rifa</Link>
    </HomeContainer>
  );
}

export default Home;

//const AppContainer = styled(Div100vh)`
const HomeContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
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
