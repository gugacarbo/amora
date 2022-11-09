import { motion } from "framer-motion";
import styled from "styled-components";

 function Header() {
  return (
    <HeaderContainer
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.5 }}
    >
      Reserva Concluída
    </HeaderContainer>
  );
}
export default Header;

const HeaderContainer = styled(motion.div)`
  font-size: 2rem;
  font-weight: 700;
  width: 100%;
  height: 100%;
  padding: 1rem 0;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.main.color};
  position: relative;
`;

