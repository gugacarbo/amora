import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

  let pixKey = import.meta.env.VITE_PIX_KEY;

  switch (import.meta.env.VITE_PIX_KEY_TYPE) {
    case "CPF":
      pixKey = import.meta.env.VITE_PIX_KEY.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2}).*/,
        "$1.$2.$3-$4"
      );
      break;
    case "TELEFONE":
      pixKey = import.meta.env.VITE_PIX_KEY.replace(
        /^(\d{2})(\d{1})(\d{4})(\d{4}).*/,
        "($1) $2 $3-$4"
      );
      break;
    case "CNPJ":
      pixKey = import.meta.env.VITE_PIX_KEY.replace(
        /^(\d{2})(\d{3})(\d{4})(\d{2}).*/,
        "$1.$2/$3-$4"
      );
      break;
  }

  return (
    <>
      <PaymentContainer
        initial={{ opacity: 0, y: "100%" }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.8, duration: 0.5 },
        }}
        exit={{
          opacity: 0,
          y: "100%",
          transition: { delay: 0.4, duration: 0.5 },
        }}
      >
        <PagueComPix>
          <PixSvg /> Pague com Pix <PixSvg />
        </PagueComPix>
        <PixReceiverData>
          <span>
            Valor Total: R$
            {(boughtNumbers.length * raffleData.number_price)
              .toFixed(2)
              .replace(".", ",")}
          </span>
          <span>Beneficiário: {import.meta.env.VITE_PIX_NAME}</span>
          <span>Chave: {pixKey}</span>
          <span>Instituição: {import.meta.env.VITE_PIX_BANK}</span>
        </PixReceiverData>
        <PixCodeInput
          pixCode={pixCode}
          setShowQr={setShowQr}
          pixQrCode={pixQrCode}
        />
      </PaymentContainer>
      <QrShow setShowQr={setShowQr} pixQrCode={pixQrCode} showQr={showQr} />
    </>
  );
}

export default Payment;

const PaymentContainer = styled(motion.div)`
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
  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

const PagueComPix = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  gap: 1rem;

  svg {
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
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  justify-content: space-evenly;

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
