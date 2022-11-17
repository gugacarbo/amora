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
    @media (max-width: 1200px) {
        html{
            font-size: 11px;
        }
    }
    @media (max-width: 960px) {
        html{
            font-size: 11px;
        }
    }
    @media (max-width: 770px) {
        html{
            font-size: 12px;
        }
    }
    @media (max-width: 500px) {
        html{
            font-size: 12px;
        }
    }

    @media (max-width: 400px) {
        html{
            font-size: 10px;
        }
    }
    @media (max-width: 320px) {
        html{
            font-size: 9px;
        }
    }
    @media (max-width: 280px) {
        html{
            font-size: 8px;
        }
    }
    


    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: 'Comfortaa', 'Poppins', sans-serif;
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.color.black};
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        *{

        &::-webkit-scrollbar {
            width: .6rem;
            height: .6rem;
        }
        &::-webkit-scrollbar-track {
            background: transparent;
    background: ${({ theme }) => theme.color.main.lighter};

        }
        &::-webkit-scrollbar-thumb {
            border-radius: 20px;
            background-color: ${({ theme }) => theme.color.main.medium};
           
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
