import { motion } from "framer-motion";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as HomeSvg } from "../../../../assets/houseBone.svg";
import { ReactComponent as LogoutSvg } from "../../../../assets/logout.svg";
import RaffleContext from "../../../../context/RaffleContext";
function Header() {
  const { resetClientData } = useContext(RaffleContext);
  return (
    <HeaderContainer
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.5 }}
    >
      Numeros Comprados
      <BackButton to={"/"}>
        <HomeSvg />
        <small>Início</small>
      </BackButton>
      <LogoutButton onClick={resetClientData} to={"/acessar"}>
        <LogoutSvg />
        <small>Sair</small>
      </LogoutButton>
    </HeaderContainer>
  );
}
export default Header;

const HeaderContainer = styled(motion.div)`
  font-size: 2rem;
  font-weight: 700;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.main.color};
  position: relative;
`;

const BackButton = styled(Link)`
  height: 100%;
  background-color: ${({ theme }) => theme.color.main.color};
  color: ${({ theme }) => theme.color.white};
  position: absolute;
  top: 0rem;
  left: 0rem;
  padding: 0 3rem;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    position: absolute;
    width: 3rem;
    height: 3rem;
    top: 1rem;
    fill: ${({ theme }) => theme.color.white};
  }
  small {
    position: absolute;
    bottom: 0.5rem;
    font-size: 1rem;
  }
`;

const LogoutButton = styled(BackButton)`
  left: auto;
  right: 0rem;

  svg {
    top: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
  }
`;
