import { motion } from "framer-motion";
import Div100vh from "react-div-100vh";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Image from "./components/Image";

function Home() {
  const navigate = useNavigate();
  return (
    <HomeContainer
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ pacity: 1 }}
      transition={{ delay: 0, duration: 0.5 }}
    >
      <Title
        initial={{ opacity: 0, y: "-100%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0, y: "-100%" }}
      >
        Olá eu sou a Amora
      </Title>
      <Image />
      <Text
        initial={{ opacity: 0.13, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        exit={{ opacity: 0.13, x: -200 }}
      >
        <span>Fui abandonada e estou a procura de um lar</span>
        <span>Você pode me ajudar comprando a minha rifa</span>
      </Text>
      <Button
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        exit={{ x: "-100vw" }}
        onClick={() => navigate("/rifa")}
      >
        Rifa
      </Button>
      <Button
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        exit={{ x: "100vw" }}
        second
        onClick={() => navigate("/rifa")}
      >
        Me dê um lar
      </Button>
    </HomeContainer>
  );
}

export default Home;

const Text = styled(motion.p)`
  grid-area: HomeText;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1.2rem;
  text-align: center;
  padding: 0 1rem;
  font-family: "Poppins";
`;

const Button = styled(motion.div)`
  grid-area: HomeButton;
  background-color: ${({ theme, second }) =>
    second ? theme.color.main.complement : theme.color.main.color};

  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  transition: ${({ theme }) => theme.transition.slow};
  width: 70%;
  text-align: center;
  border: 1px solid transparent;
  margin: 0.5rem;
  cursor: pointer;

  color: ${({ theme, second }) =>
    second ? theme.color.white : theme.color.white};
  text-decoration: none;
  &:hover {
    color: ${({ theme, second }) =>
      second ? theme.color.main.complement : theme.color.main.color};
    background-color: ${({ theme }) => theme.background};
    border: 1px solid
      ${({ theme, second }) =>
        second ? theme.color.main.complement : theme.color.main.color};
    box-shadow: 0 0 0.2rem 0.2rem
      ${({ theme, second }) =>
        second ? theme.color.main.complement : theme.color.main.color};
  }

  ${({ second }) =>
    second &&
    `
    grid-area: HomeButton2;
    `}
`;

const HomeContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 8rem 1fr auto auto 8rem;
  grid-template-areas:
    "HomeTitle HomeTitle"
    "HomeText HomeImage"
    "HomeButton HomeButton"
    "HomeButton2 HomeButton2"
    " . . ";
  place-items: center;
  overflow: hidden;
`;

const Title = styled(motion.h1)`
  grid-area: HomeTitle;
  font-size: 3rem;
  font-family: "Pacifico", cursive;
  color: ${({ theme }) => theme.color.main.color};
  width: 100%;
  height: 100%;
  font-weight: 400;
  text-align: center;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  justify-content: center;
  align-items: center;
`;
