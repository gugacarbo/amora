import ImageGallery from "react-image-gallery";
import styled from "styled-components";
import "react-image-gallery/styles/css/image-gallery.css";

import AmoraImg1 from "../../../assets/adoptImages/Amora1.jpeg";
import AmoraImg2 from "../../../assets/adoptImages/Amora2.jpeg";
import AmoraImg4 from "../../../assets/adoptImages/Amora4.jfif";
import AmoraImg5 from "../../../assets/adoptImages/Amora5.jpeg";
import AmoraImg6 from "../../../assets/adoptImages/Amora6.jpeg";

function Galery() {
  const images = [
    {
      original: AmoraImg1,
      originalHeight: "100%",
      thumbnail: AmoraImg1,
    },
    {
      original: AmoraImg2,
      originalHeight: "100%",
      thumbnail: AmoraImg2,
    },
  
    {
      original: AmoraImg4,
      originalHeight: "100%",
      thumbnail: AmoraImg4,
    },
    {
      original: AmoraImg5,
      originalHeight: "100%",
      thumbnail: AmoraImg5,
    },
    {
      original: AmoraImg6,
      originalHeight: "100%",
      thumbnail: AmoraImg6,
    },
  ];

  return (
    <GaleryContainer>
      <ImageGallery items={images} />
    </GaleryContainer>
  );
}

const GaleryContainer = styled.div`
  grid-column: 1/3;
  width: 85%;
  height: 100%;
  margin: 0 auto;
`;
export default Galery;
