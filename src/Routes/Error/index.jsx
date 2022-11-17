import styled from "styled-components";
import { ReactComponent as ErrorSvg } from "../../assets/x.svg";
import { ReactComponent as HomeSvg } from "../../assets/houseBone.svg";
import { Link } from "react-router-dom";
function Error() {
  return (
    <ErrorScreenContent>
      <ErrorIcon />
      <Text>Um Erro Aconteceu</Text>
      <Text>Tente Novamente Mais Tarde</Text>
      <HomeLink to="/">
        <Home />
        Voltar
      </HomeLink>
    </ErrorScreenContent>
  );
}

const ErrorIcon = styled(ErrorSvg)`
  width: 7rem;
  height: 7rem;
  fill: ${({ theme }) => theme.color.main.dark};
`;
const Home = styled(HomeSvg)`
  width: 3rem;
  height: 3rem;
  fill: ${({ theme }) => theme.color.main.medium};
`;

const HomeLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-decoration: none;
  color: ${({ theme }) => theme.color.main.medium};
`;

const Text = styled.span`
  color: ${({ theme }) => theme.color.main.dark};
  font-size: 1.3rem;
`;

// const ErrorScreenContent = styled(Div100vh)`
const ErrorScreenContent = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  flex-direction: column;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: ${({ theme }) => theme.background + "bb"};
`;

export default Error;
