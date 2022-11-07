import styled from "styled-components";
import { useRef } from "react";
import { ReactComponent as CopySvg } from "../../../../../../assets/copy.svg";
import { ReactComponent as QRIconSvg } from "../../../../../../assets/QRIcon.svg";

function PixCodeInput({ pixCode, setQrOpen }) {
  const inputCopyCodeRef = useRef();

  return (
    <PixCopyCode
      onClick={() => {
        navigator.clipboard.writeText(pixPayload);
        inputCopyCodeRef.current.select();
      }}
    >
      <PixCopyInput
        ref={inputCopyCodeRef}
        type="text"
        value={pixCode}
        onChange={() => {}}
      />
      <CopySvg />
      <QRIcon onClick={() => setQrOpen((open) => !open)}>
        <QRIconSvg />
      </QRIcon>
    </PixCopyCode>
  );
}

export default  PixCodeInput;

const PixCopyCode = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  background-color: #fff;
  border-radius: 100px;
  padding: 0.2rem;
  border: 1px solid ${({ theme }) => theme.color.main.dark};
  cursor: pointer;
  svg {
    width: 1.4rem;
    height: 1.4rem;
    fill: ${({ theme }) => theme.color.main.dark};
  }
`;

const PixCopyInput = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100%;
  border: none;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 10px;
  outline: none;
  cursor: pointer;

  padding: 0.2rem;
`;

const QRIcon = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.color.white};
  fill: ${({ theme }) => theme.color.main.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.slow};
  svg {
    width: 1.4rem;
    height: 1.4rem;
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.main.light};
    fill: ${({ theme }) => theme.color.white};
  }
`;
