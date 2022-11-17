import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import AmoraImg1 from "../../assets/Amora1.jpeg";
import AmoraImg4 from "../../assets/Amora4.jfif";
import AmoraImg5 from "../../assets/Amora5.jpeg";
import { ReactComponent as ArrowLeftIcon } from "../../assets/arrowLeft.svg";
import Contact from "./Contact";
import Galery from "./Galery";
function Adopt() {
  const navigate = useNavigate();

  return (
    <AdoptContainer
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
        <BackButton to={"/"}>
          <ArrowLeftIcon />
          <small>Voltar</small>
        </BackButton>
        Adote a Amora
      </Title>
      <AdoptContent
        initial={{ opacity: 0.13 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        exit={{ opacity: 0.13 }}
      >
        <Row>
          <h3>Olá Ser Humano!</h3>
        </Row>
        <Row>
          <p>
            Fui encontrada no dia 30/10/2022 nas imediações do Armazém Vieira,
            na Costeira, muito assustada e correndo entre os carros e motos,
            quase fui atropelada, mas por sorte me resgataram!
            <small>
              Alguns dizem que fui deixada ali por volta do dia 27/10/2022.
            </small>
          </p>
        </Row>
        <Row>
          <Image>
            <img src={AmoraImg1} alt="" />
          </Image>
          <span>
            <small>
              Dois tios me encontraram e me deram ração e água. Outros tios me
              ajudaram nos dias seguintes, me acolhendo para eu não ficar na rua
              sozinha.
            </small>
          </span>
        </Row>
        <Row>
          <p>
            <small>
              Agora estou numa hospedagem social e estou procurando alguém para
              dar muito amor e carinho.
            </small>
            <small>Adoro abraçar humanos!</small>
          </p>
        </Row>
        <Row>
          <p>
            Sou grandona (25Kg) e preciso de espaço para correr. Posso ser a
            guarda da sua casa, pois gosto de ficar numa caminha quentinha na
            varanda, correndo e brincando com outros Aumigos
          </p>
        </Row>
        <Row>
          <span>
            <small>
              Sou muito inteligente e aprendo bem rápido! Não faço muito barulho
              ou bagunça.
            </small>
            <small>
              Não tenho vermes, pulgas ou carrapatos, já fui vacinada e estou na
              fila de castração.
            </small>
          </span>
          <Image>
            <img src={AmoraImg5} alt="" />
          </Image>
        </Row>
        <Row>
          <small>
            <b>Estou a procura de um tutor ou um lar temporário</b>
          </small>
        </Row>
        <Galery />
        <Contact />
      </AdoptContent>
    </AdoptContainer>
  );
}

export default Adopt;
const AdoptContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 5rem 1fr;
  grid-template-areas:
    "AdoptTitle AdoptTitle"
    "AdoptContent AdoptContent";
  place-items: center;
  overflow: hidden;
  position: relative;
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.color.main.color};
  }
`;

const Title = styled(motion.h1)`
  grid-area: AdoptTitle;
  font-size: 2.7rem;
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

const AdoptContent = styled(motion.div)`
  grid-area: AdoptContent;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;

  row-gap: 1rem;
  font-size: 1.3rem;
  text-align: center;
  padding: 0;
  font-family: "Poppins";
  overflow-y: scroll;
`;
const Row = styled.div`
  grid-column: 1/3;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 1rem;
    font-size: 2rem;
  }
  small,
  span,
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 90%;
    font-size: 1.2rem;
    margin: 0.5rem auto;
    text-align: justify;
    line-height: 1.8rem;
  }
  span {
    width: 50%;
    font-size: 1.2rem;
    small {
      text-align: center;
      font-size: 1.2rem;

      margin: 0.5rem;
    }
  }
  b {
    font-size: 1.5rem;
    text-align: center;
    margin: 0.5rem 0;
  }
`;
const Space = styled(Row)``;

const Image = styled.div`
  width: 40%;
  margin: auto;
  overflow: hidden;
  aspect-ratio: 1;
  border-radius: 50%;
  img {
    width: 100%;
  }
`;

const BackButton = styled(Link)`
  height: 100%;
  background-color: ${({ theme }) => theme.color.main.color};
  color: ${({ theme }) => theme.color.white};
  position: absolute;
  top: 0rem;
  left: 0rem;
  padding: 0 2rem;
  text-decoration: none;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  transition: ${({ theme }) => theme.transition.main};
  svg {
    width: 1.8rem;
    height: 1.8rem;
    fill: ${({ theme }) => theme.color.white};
    transition: ${({ theme }) => theme.transition.main};
  }
  small {
    font-family: "Poppins";
    bottom: 0.5rem;
    width: 90%;
    font-size: 0.8rem;
    text-align: center;
    transition: ${({ theme }) => theme.transition.main};
  }
  &:hover {
    svg {
      fill: ${({ theme }) => theme.color.main.triad[1]};
    }
    small {
      color: ${({ theme }) => theme.color.main.triad[1]};
    }
  }
`;
