import { motion } from "framer-motion";
import { useContext } from "react";
import styled from "styled-components";
import RaffleContext from "../../../../context/RaffleContext";

 function Title() {
  const { clientData } = useContext(RaffleContext);

  return (
    <TitleContainer
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1}}
      exit={{ opacity: 0, scale: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      Obrigada {clientData?.name}!
    </TitleContainer>
  );
}
export default Title;

const TitleContainer = styled(motion.h4)`
  padding: 0.5rem 0;
  font-size: 2rem;
  width: 100%;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.main.medium};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
