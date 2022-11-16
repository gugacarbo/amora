import { motion } from "framer-motion";
import { useContext } from "react";
import styled from "styled-components";
import RaffleContext from "../../../../context/RaffleContext";
import { ReactComponent as GiftSvg } from "../../../../assets/gift.svg";

function Legend() {
  const { raffleData, setShowPrize } = useContext(RaffleContext);
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
      <LegendItem onClick={() => setShowPrize(true)}>
        <GiftIcon  />
        Prêmio: <span>{raffleData?.prize?.name}</span>
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
  display: flex;
  gap: 0.5rem;
  cursor: pointer;

`;
const GiftIcon = styled(GiftSvg)`
  height: 1rem;
  fill: ${({ theme }) => theme.color.main.light};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.main};
  &:hover {
    fill: ${({ theme }) => theme.color.main.color};
  }
`;
