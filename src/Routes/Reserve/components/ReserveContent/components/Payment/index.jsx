import { useContext, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import RaffleContext from "../../../../../../context/RaffleContext";
import { Pix } from "../../../../../../util/hooks";

import PixCodeInput from "./PixCodeInput";
import QrShow from "./QrShow";

import { ReactComponent as PixSvg } from "../../../../../../assets/pix.svg";

function Payment() {
  const { boughtNumbers, raffleData, clientData } = useContext(RaffleContext);
  const [showQr, setShowQr] = useState(false);

  const [pixCode, pixQrCode] = Pix(
    clientData?.cpf ?? "",
    boughtNumbers ?? [],
    raffleData?.number_price ?? 0
  );

  return (
    <PaymentContainer>
      <PagueComPix>
        Pague com Pix <PixSvg />
      </PagueComPix>
      <PixReceiverData>
        <span>
          Valor Total: R$
          {(boughtNumbers.length * raffleData.number_price)
            .toFixed(2)
            .replace(".", ",")}
        </span>
        <span>Beneficiário: Nicole Mascarenhas</span>
        <span>Chave: (48) 9.8843-1797</span>
        <span>Instituição: NU PAGAMENTOS</span>
      </PixReceiverData>
      <PixCodeInput
        pixCode={pixCode}
        setShowQr={setShowQr}
        pixQrCode={pixQrCode}
      />
      <QrShow setShowQr={setShowQr} pixQrCode={pixQrCode} showQr={showQr} />
    </PaymentContainer>
  );
}

export default Payment;

const PaymentContainer = styled.div`
  font-size: 1.2rem;
  width: 100%;
  padding: 2rem 0;
  height: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.color.main.medium};
  color: ${({ theme }) => theme.color.white};
  display: flex;
  gap: 2rem;
  flex-direction: column;
  align-items: center;
`;

const PagueComPix = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  svg {
    margin-left: 1rem;
    width: 1.8rem;
    height: 1.8rem;
    fill: ${({ theme }) => theme.color.white};
    stroke: ${({ theme }) => theme.color.white};
    stroke-width: 3px;
    overflow: visible;
  }
`;

const PixReceiverData = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: "Poppins", sans-serif;
  gap: 0.5rem;
  span {
    color: ${({ theme }) => theme.color.white};
  }
`;

const PixData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
