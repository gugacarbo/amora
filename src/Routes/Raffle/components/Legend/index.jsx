import { motion } from "framer-motion";
import styled from "styled-components";

function Legend() {
  return (
    <LegendContainer
    initial={{ opacity: 0, y: "-100%" }}
    animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.5 } }}
    exit={{
      opacity: 0,
      y: "-100%",
      transition: { delay: 0.2, duration: 0.3 },
    }}
    >
      <LegendItem>
        Prêmio: <span>Bolo</span>
      </LegendItem>
    </LegendContainer>
  );
}
export default Legend;

const LegendContainer = styled(motion.div)`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0.5rem;
  z-index: 3;
  background-color: ${({ theme }) => theme.color.white};
`;

const LegendItem = styled.p`
  font-size: 1rem;
  width: 100%;
`;
