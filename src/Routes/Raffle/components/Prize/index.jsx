import { motion } from "framer-motion";
import { useContext } from "react";
import styled from "styled-components";
import RaffleContext from "../../../../context/RaffleContext";

function Prize() {
  const { showPrize, setShowPrize, raffleData } = useContext(RaffleContext);

  return (
    <PrizeContainer
      initial={{ opacity: 0, x: "100%" }}
      animate={showPrize ? { opacity: 1, x: "0" } : { opacity: 0, x: "100%" }}
      transition={{ duration: 0.7 }}
      onClick={() => setShowPrize(false)}
    >
      <ImageContainer>
        <img src={raffleData?.prize?.img} />
      </ImageContainer>
    </PrizeContainer>
  );
}
const ImageContainer = styled.div`
  width: 50%;
  img {
    width: 100%;
  }
`;
const PrizeContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000082;
`;

export default Prize;
