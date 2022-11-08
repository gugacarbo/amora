import styled from "styled-components";
import { useRef } from "react";
import { ReactComponent as CopySvg } from "../../../../../../../assets/copy.svg";
import { ReactComponent as QRIconSvg } from "../../../../../../../assets/QRIcon.svg";
import { useState } from "react";

function PixCodeInput({ pixCode, setShowQr }) {
  const inputCopyCodeRef = useRef();
  const [copied, setCopied] = useState(0);

  return (
    <PixCopyCode>
      <CopyMessage copied={copied}>Copiado</CopyMessage>
      <PixCopyInput
        ref={inputCopyCodeRef}
        type="text"
        value={pixCode}
        onChange={(e) => false}
        onClick={() => {
          navigator.clipboard.writeText(pixCode);
          inputCopyCodeRef.current.select();
          setCopied(1);
          setTimeout(() => {
            setCopied(0);
          }, 1000);
        }}
      />
      <CopySvg
        onClick={() => {
          navigator.clipboard.writeText(pixCode);
          inputCopyCodeRef.current.select();
          setCopied(1);
          setTimeout(() => {
            setCopied(0);
          }, 1000);
        }}
      />
      <QRIcon onClick={() => setShowQr((open) => !open)}>
        <QRIconSvg />
      </QRIcon>
    </PixCopyCode>
  );
}

export default PixCodeInput;
const CopyMessage = styled.small`
  position: absolute;
  bottom: -110%;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: "Poppins";
  font-weight: bold;
  transition: ${({ theme }) => theme.transition.x2};
  ${({ copied }) =>
    copied
      ? `
      opacity: 1;
      `
      : `
      opacity: 0;
  `}
`;
const PixCopyCode = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 90%;
  background-color: #fff;
  border-radius: 100px;
  padding: 0.2rem;
  border: 1px solid ${({ theme }) => theme.color.main.dark};
  cursor: pointer;
  position: relative;
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

  ::selection {
    background-color: ${({ theme }) => theme.color.main.light};
    color: #fff;
  }
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
