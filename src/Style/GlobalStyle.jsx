import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html{
        font-size: 16px;
    }
    @media (max-width: 1800px) {
        html{
            font-size: 14px;
        }
    }
    @media (max-width: 1350px) {
        html{
            font-size: 13px;
        }
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: 'Comfortaa', 'Poppins', sans-serif;
        background-color: ${({ theme }) => theme.color.darkGray};
        color: ${({ theme }) => theme.color.text};
        overflow-x: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        *{

            &::-webkit-scrollbar {
                width: 8px;
            height: 8px;
        }
        &::-webkit-scrollbar-track {
            background: transparent;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 20px;
            background-color: ${({ theme }) => theme.color.main.color};
           
        }
        &::-webkit-scrollbar-thumb:hover {
            background-color: ${({ theme }) => theme.color.main.dark};
        }
        &::-webkit-scrollbar-thumb:active {
            background-color: ${({ theme }) => theme.color.main.darker};
        }
    }
    }
`;
export default GlobalStyle;
