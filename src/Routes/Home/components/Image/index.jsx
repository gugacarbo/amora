import styled from "styled-components";
import Amora1 from "../../../../assets/Amora1.jpeg";
import Amora2 from "../../../../assets/Amora2.jpeg";
import Amora3 from "../../../../assets/Amora3.jpeg";
import { ReactComponent as Moldure } from "../../../../assets/imageMoldure.svg";
import MoldureSrc from "../../../../assets/imageMoldure.svg";
import { motion } from "framer-motion";

function Image() {
  return (
    <ImageContainer
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      exit={{ opacity: 0, x: "100%" }}
    >
      <img src={Amora3} alt="Amora" />
      <Moldure />
    </ImageContainer>
  );
}
const ImageContainer = styled(motion.div)`
  grid-area: HomeImage;
  width: 80%;
  background-color: ${({ theme }) => theme.background};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: 3rem;
  svg {
    width: 170%;
    height: 160%;
    position: absolute;
    left: -45%;
    transform: scale(1.15);
    top: -28%;
    * {
      fill: ${({ theme }) => theme.background};
      stroke: ${({ theme }) => theme.color.main.color};
      stroke-width: 20px;
      stroke-dashoffset: 20;
      stroke-dasharray: 50;
    }
  }
  img {
    transform: scale(1.15);

    z-index: 10;
    width: 100%;
    height: 100%;
    object-fit: cover;
    mask-image: url(${MoldureSrc});
    mask-size: 145%;
    mask-repeat: no-repeat;
    mask-position: 70% 30%;
  }
`;

export default Image;
