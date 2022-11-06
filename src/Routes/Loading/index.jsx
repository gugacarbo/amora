import Div100vh from "react-div-100vh";
import styled from "styled-components";
import { ReactComponent as LoadingPaws } from "../../assets/LoadingPaws.svg";
function Loading() {
  return (
    <LoadingScreenmContent>
      <LoadginIcon />
    </LoadingScreenmContent>
  );
}

var speed = 0.8;
const LoadginIcon = styled(LoadingPaws)`
  width: 15rem;
  height: 15rem;
  g {
    animation: step ${4 * speed}s linear infinite;
    opacity: 0;
    &:nth-child(2) {
      opacity: 1;
    }
    path {
      fill: ${({ theme }) => theme.color.main.dark};
    }
    ${() => {
      let keyframes = "";
      for (let i = 1; i < 10; i++) {
        keyframes += `
        &:nth-child(${i}) {
            animation-delay: ${((i - 2) * speed) / 2}s;
        }
              `;
      }
      return keyframes;
    }}
  }

  @keyframes step {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    60% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
`;

// const LoadingScreenmContent = styled(Div100vh)`
const LoadingScreenmContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background + "bb"};
  cursor: none;
`;

export default Loading;
