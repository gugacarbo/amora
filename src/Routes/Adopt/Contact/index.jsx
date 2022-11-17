import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

import { ReactComponent as HouseBoneSvg } from "../../../assets/houseBone.svg";
import { ReactComponent as WhatsappSvg } from "../../../assets/whatsapp.svg";
import { ReactComponent as InstagramSvg } from "../../../assets/instagram.svg";
import { ReactComponent as TicketIconSvg } from "../../../assets/ticketIcon.svg";

import { ReactComponent as RaffleIconSvg } from "../../../assets/raffleIcon.svg";

function Contact() {
  let message = `Olá, quero saber mais sobre a Amora!`;
  return (
    <ContactContainer>
      <Title>Me Adote!</Title>
      <Subitle>Contatos para adoção ou lar temporário</Subitle>
      <ContactNumbers>
        <Number
        onClick={() => {
          
          window.open(
            "https://api.whatsapp.com/send?phone=5548988431797" +
              "&text=" +
              message
          );
        }}
        >
          <IconBox>
            <WhatsappSvg />
          </IconBox>
          <b>Nicole</b>
          <span>(48) 9 8843-1797</span>
        </Number>
        <Number
          onClick={() => {
            
            window.open(
              "https://api.whatsapp.com/send?phone=5548991259548" +
                "&text=" +
                message
            );
          }}
          >
          <IconBox>
            <WhatsappSvg />
          </IconBox>
          <b>Marco</b>
          <span>(48) 9 8843-1797</span>
        </Number>
        <Number
          onClick={() => {
            
            window.open(
              "https://api.whatsapp.com/send?phone=5548984286466" +
                "&text=" +
                message
            );
          }}
          >
          <IconBox>
            <WhatsappSvg />
          </IconBox>
          <b>Jeison</b>
          <span>(48) 9 8428-6466</span>
        </Number>
        <Number
          onClick={() => {
            
            window.open(
              "https://api.whatsapp.com/send?phone=5549999606003"+
                "&text=" +
                message
            );
          }}
          >
          <IconBox>
            <WhatsappSvg />
          </IconBox>
          <b>Gustavo</b>
          <span>(49) 9 9960-6003</span>
        </Number>
      </ContactNumbers>
    </ContactContainer>
  );
}

const ContactContainer = styled.div`
  font-size: 1.2rem;
  width: 100%;
  height: 100%;
  grid-column: 1/3;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-family: "Pacifico", cursive;
  font-weight: 400;
  width: 100%;
  background-color: ${({ theme }) => theme.color.main.medium};
  color: ${({ theme }) => theme.color.white};
`;
const Subitle = styled.h2`
  font-family: "Poppins", cursive;
  font-weight: 400;
  font-size: 1.5rem;
  padding: 0.5rem 0;
  background-color: ${({ theme }) => theme.color.main.color};
  color: ${({ theme }) => theme.color.white};
`;

const ContactNumbers = styled.div`
  padding-top: 2rem;
  padding-bottom: 5rem;
  background-color: ${({ theme }) => theme.color.main.light};
  gap: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.3rem;
  height: 2.3rem;
  svg {
    width: 4rem;
    height: 4rem;
    fill: ${({ theme }) => theme.color.main.darker};
    transition: ${({ theme }) => theme.transition.x2};
  }
`;

const Number = styled.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Poppins", cursive;
  font-weight: 500;
  color: ${({ theme }) => theme.color.main.darker};
  transition: ${({ theme }) => theme.transition.main};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.white};
    & ${IconBox} {
      svg {
        fill: ${({ theme }) => theme.color.green};
      }
    }
  }
`;

const L = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.color.white};
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  display: grid;
  height: 100%;
  font-size: 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  transition: ${({ theme }) => theme.transition.x2};

  &:hover {
    color: ${({ theme }) => theme.color.main.triad[1]};
    ${IconBox} {
      svg {
        fill: ${({ theme }) => theme.color.main.triad[1]};
        .RaffleIconSvgClass-2 {
          fill: ${({ theme }) => theme.color.main.triad[1]};
        }
      }
    }
  }
`;

const Reserves = styled(L)`
  grid-area: reserves;
  svg {
    transform: scale(1.3);
  }
`;
const Home = styled(L)`
  grid-area: home;
`;
const RafleIcon = styled(L)`
  grid-area: rafle;
  svg {
    fill: ${({ theme }) => theme.color.white};
    transform: scale(0.9);
    .RaffleIconSvgClass-2 {
      transition: ${({ theme }) => theme.transition.x2};

      fill: ${({ theme }) => theme.color.main.triad[1]};
      opacity: 1;
    }
  }
`;
const Whatsapp = styled(L)`
  grid-area: whatsapp;
  svg {
    transform: scale(0.85);
  }
`;
const Instagram = styled(L)`
  grid-area: instagram;
  svg {
    transform: scale(0.85);
  }
`;
const Socials = styled.div`
  grid-area: socials;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;
export default Contact;
