import { createGlobalStyle } from "styled-components";

import BDPBIRGULA from "../assets/fonts/BDPBIRGULA.ttf";
import Gothan from "../assets/fonts/Gothan.ttf";

import PoppinsBold from "../assets/fonts/Poppins/Poppins-Bold.otf";
import PoppinsExtraBold from "../assets/fonts/Poppins/Poppins-ExtraBold.otf";
import PoppinsExtraLight from "../assets/fonts/Poppins/Poppins-ExtraLight.otf";
import PoppinsMedium from "../assets/fonts/Poppins/Poppins-Medium.otf";
import Poppins from "../assets/fonts/Poppins/Poppins-Regular.otf";
import PoppinsThin from "../assets/fonts/Poppins/Poppins-Thin.otf";

const Fonts = createGlobalStyle`

    @font-face {
        font-family: 'BDPBIRGULA';
        src: url(${BDPBIRGULA}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    
    @font-face {
        font-family: 'Gothan';
        src: url(${Gothan}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'Poppins';
        src: url(${Poppins}) format('opentype');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'Poppins';
        src: url(${PoppinsBold}) format('opentype');
        font-weight: bold;
        font-style: normal;
    }

    @font-face {
        font-family: 'Poppins';
        src: url(${PoppinsExtraBold}) format('opentype');
        font-weight: 600;
        font-style: normal;
    }

    @font-face {
        font-family: 'Poppins';
        src: url(${PoppinsExtraLight}) format('opentype');
        font-weight: 200;
        font-style: normal;
    }

    @font-face {
        font-family: 'Poppins';
        src: url(${PoppinsMedium}) format('opentype');
        font-weight: 500;
        font-style: normal;
    }

    @font-face {
        font-family: 'Poppins';
        src: url(${PoppinsThin}) format('opentype');
        font-weight: 100;
        font-style: normal;
    }

`;

export default Fonts;
