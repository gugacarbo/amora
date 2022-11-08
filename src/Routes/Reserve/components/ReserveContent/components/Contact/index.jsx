import { Link } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as HouseBoneSvg } from "../../../../../../assets/houseBone.svg";
import { ReactComponent as WhatsappSvg } from "../../../../../../assets/whatsapp.svg";
import { ReactComponent as InstagramSvg } from "../../../../../../assets/instagram.svg";
import { ReactComponent as LogoSvg } from "../../../../../../assets/logo.svg";
function Contact() {
  return (
    <ContactContainer>
      <Home to="/">
        <IconBox>
          <HouseBoneSvg />
        </IconBox>
        Início
      </Home>
      <Reserves to="/acessar">
        <IconBox>
          <LogoSvg />
        </IconBox>
        Meus Bilhetes
      </Reserves>
      <Whatsapp>
        <IconBox>
          <WhatsappSvg />
        </IconBox>
        Whatsapp
      </Whatsapp>
      <Instagram>
        <IconBox>
          <InstagramSvg />
        </IconBox>
        Instagram
      </Instagram>
    </ContactContainer>
  );
}

const ContactContainer = styled.div`
  font-size: 1.2rem;
  width: 100%;
  padding: 2rem 0;
  height: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.color.main.color};
  color: ${({ theme }) => theme.color.white};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "  instagram whatsapp reserves home";
  place-items: center;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  margin: auto;
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
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  transition: ${({ theme }) => theme.transition.x2};

  &:hover {
    color: ${({ theme }) => theme.color.main.dark};
    ${IconBox} {
      svg {
        fill: ${({ theme }) => theme.color.main.dark};
      }
    }
  }
`;

const Reserves = styled(L)`
  grid-area: reserves;
`;
const Home = styled(L)`
  grid-area: home;
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