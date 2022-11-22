import { motion } from "framer-motion";
import Div100vh from "react-div-100vh";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Image from "./components/Image";
import { ReactComponent as WhatsappSvg } from "../../assets/whatsapp.svg";
import { ReactComponent as InstagramSvg } from "../../assets/instagram.svg";

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
        initial={{ opacity: 0.13, x: "-70vh" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        exit={{ opacity: 0.13, x: "-70vh" }}
      >
        <span>Au au</span>
        <span>Meu nome é Amora Jessie e estou à procura de um lar</span>
        <span>Conto com a sua ajuda!</span>
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
        initial={{ x: "300%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        exit={{ x: "300%", opacity: 0 }}
        second
        onClick={() => navigate("/adote")}
      >
        Ajude a Amora
      </Button>
      <LoginButton
        initial={{ y: "100vh" }}
        animate={{ y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        exit={{ y: "100vh" }}
      >
        <Link to="/acessar">Ver meus Bilhetes</Link>
      </LoginButton>
      <Instagram
        onClick={() => {
          window.open(
            "https://www.instagram.com/" + import.meta.env.VITE_INSTAGRAM,
            "_blank"
          );
        }}
        initial={{ opacity: 0, y: "100%" }}
        animate={{
          opacity: 0.8,
          y: 0,
          transition: { delay: 0.8, duration: 0.5 },
        }}
        exit={{
          opacity: 0,
          y: "100%",
          transition: { delay: 0.6, duration: 0.5 },
        }}
      >
        <InstagramSvg />
      </Instagram>
      <Whatsapp
        onClick={() => {
          let message = `Olá, quero saber mais sobre a Amora!`;
          window.open(
            "https://api.whatsapp.com/send?phone=" +
              import.meta.env.VITE_WHATSAPP_NUMBER +
              "&text=" +
              message
          );
        }}
        initial={{ opacity: 0, y: "100%" }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 1, duration: 0.5 },
        }}
        exit={{
          opacity: 0,
          y: "100%",
          transition: { delay: 0.4, duration: 0.5 },
        }}
      >
        <WhatsappSvg />
      </Whatsapp>
    </HomeContainer>
  );
}

export default Home;
const HomeContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 7rem 1fr auto auto 7rem;
  grid-template-areas:
    "HomeTitle HomeTitle"
    "HomeText HomeImage"
    "HomeButton HomeButton"
    "HomeButton2 HomeButton2"
    " login login ";
  place-items: center;
  overflow: hidden;
  position: relative;
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

const Text = styled(motion.p)`
  grid-area: HomeText;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1.3rem;
  text-align: center;
  padding: 0 1rem;
  font-family: "Poppins";
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
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

const LoginButton = styled(motion.div)`
  grid-area: login;
  a {
    font-size: 1.1rem;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: ${({ theme }) => theme.color.main.dark};
    display: flex;
    justify-content: center;
    align-items: center;
    transition: ${({ theme }) => theme.transition.main};
    &:hover {
      color: ${({ theme }) => theme.color.main.complement};
    }
  }
`;

const Whatsapp = styled(motion.div)`
  position: absolute;
  left: 4.5rem;
  bottom: 1.5rem;
  width: 1.8rem;
  height: 1.8rem;

  svg {
    overflow: visible;
    width: 100%;
    height: 100%;
    //whatsapp color
    fill: #25d366;
    stroke-width: 0.2rem;
    transition: ${({ theme }) => theme.transition.x2};
    cursor: pointer;
    stroke: ${({ theme }) => theme.color.main.complement};
    filter: drop-shadow(0 0 0.1rem ${({ theme }) => theme.color.white});
    &:hover {
      stroke: ${({ theme }) => theme.color.white};
      filter: drop-shadow(0 0 0.2rem ${({ theme }) => theme.color.green});
    }
  }
`;

const Instagram = styled(Whatsapp)`
  left: 1.5rem;
  bottom: 1.5rem;

  right: unset;
  svg {
    fill: #e1306c;
    stroke: #e1306c;
    &:hover {
      filter: drop-shadow(0 0 0.2rem #e04e7f);
      stroke: #ff96b9;
    }
  }
`;
