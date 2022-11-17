import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

import { ReactComponent as HouseBoneSvg } from "../../../../../../assets/houseBone.svg";
import { ReactComponent as WhatsappSvg } from "../../../../../../assets/whatsapp.svg";
import { ReactComponent as InstagramSvg } from "../../../../../../assets/instagram.svg";
import { ReactComponent as TicketIconSvg } from "../../../../../../assets/ticketIcon.svg";

import { ReactComponent as RaffleIconSvg } from "../../../../../../assets/raffleIcon.svg";

function Contact() {
  return (
    <ContactContainer
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5 } }}
      exit={{
        opacity: 0,
        y: "100%",
        transition: { delay: 0.6, duration: 0.5 },
      }}
    >
      <RafleIcon to="/rifa">
        <IconBox>
          <RaffleIconSvg />
        </IconBox>
        Rifa
      </RafleIcon>
      <Home to="/">
        <IconBox>
          <HouseBoneSvg />
        </IconBox>
        Início
      </Home>
      <Reserves to="/acessar">
        <IconBox>
          <TicketIconSvg />
        </IconBox>
        Meus Bilhetes
      </Reserves>
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
      >
        <IconBox>
          <WhatsappSvg />
        </IconBox>
        Whatsapp
      </Whatsapp>
      <Instagram
        onClick={() =>
          window.open(
            "https://www.instagram.com/" + import.meta.env.VITE_INSTAGRAM,
            "_blank"
          )
        }
      >
        <IconBox>
          <InstagramSvg />
        </IconBox>
        Instagram
      </Instagram>
    </ContactContainer>
  );
}

const ContactContainer = styled(motion.div)`
  font-size: 1.2rem;
  width: 100%;
  padding-top: 1rem;
  text-align: center;
  background-color: ${({ theme }) => theme.color.main.color};
  color: ${({ theme }) => theme.color.white};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "  instagram whatsapp reserves rafle home";
  place-items: center;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.3rem;
  height: 2.3rem;
  margin: 0 auto;
  margin-top: auto;
  svg {
    width: 4rem;
    height: 4rem;
    fill: ${({ theme }) => theme.color.white};
    transition: ${({ theme }) => theme.transition.x2};
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
