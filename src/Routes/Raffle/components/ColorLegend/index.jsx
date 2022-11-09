import { motion } from "framer-motion";
import styled from "styled-components";

function ColorLegend() {
  return (
    <ColorLegendContainer
      initial={{ opacity: 0, y: "-100%" }}
      animate={{ opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.6 } }}
      exit={{
        opacity: 0,
        y: "-100%",
        transition: { delay: 0.2, duration: 0.2 },
      }}
    >
      <ColorLegendItem>
        <Color color="#fefefe" />
        <ColorLegendText>Disponível</ColorLegendText>
      </ColorLegendItem>
      <ColorLegendItem>
        <Color color="#B5F6FF" />
        <ColorLegendText>Selecionado</ColorLegendText>
      </ColorLegendItem>
      <ColorLegendItem>
        <Color color="#0099cc" />
        <ColorLegendText>Pago</ColorLegendText>
      </ColorLegendItem>
      <ColorLegendItem>
        <Color color="#bbbbbb" />
        <ColorLegendText>Inisponível</ColorLegendText>
      </ColorLegendItem>
    </ColorLegendContainer>
  );
}
export default ColorLegend;

const ColorLegendContainer = styled(motion.div)`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  background-color: ${({ theme }) => theme.color.white + "80"};
  padding: 1rem 0;
  gap: 0.5rem;
  z-index: 2;
`;

const ColorLegendItem = styled(motion.div)`
  width: 80%;
  margin-left: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
`;
const Color = styled(motion.div)`
  width: 1rem;
  height: 1rem;
  border-radius: 15%;
  background-color: ${({ color }) => color};
  border: 1px solid ${({ theme }) => theme.color.black};
`;

const ColorLegendText = styled(motion.p)`
  font-family: "Poppins", sans-serif;

  font-size: 1rem;
`;
