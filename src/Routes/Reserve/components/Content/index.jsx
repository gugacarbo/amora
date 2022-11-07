import { ReactComponent as PixSvg } from "../../../../assets/pix.svg";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import RaffleContext from "../../../../context/RaffleContext";
import { Pix } from "../../../../util/hooks";
import PixCodeInput from "./components/PixCodeInput";

export default function Content() {
  const { boughtNumbers, raffleData, clientData } = useContext(RaffleContext);
  const [qrOpen, setQrOpen] = useState(false);

  const [pixCode, pixQrCode] = Pix(
    clientData?.cpf ?? "",
    boughtNumbers ?? [],
    raffleData?.number_price ?? 0
  );

  return (
    <ReserveContent>
      <AmoraText>
        <span>
          A Amora agradece a sua contribuição e deseja boa sorte! Au Au!
        </span>
        <span>
          Valor Total: R$
          {(boughtNumbers.length * raffleData.number_price)
            .toFixed(2)
            .replace(".", ",")}
        </span>
        <PagueComPix>
          Pague com Pix <PixSvg />
        </PagueComPix>
        <PixCodeInput pixCode={pixCode} setQrOpen={setQrOpen} />
        <QrContent
          initial={{ opacity: 0 }}
          animate={{ opacity: qrOpen ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          visible={qrOpen}
          onClick={() => setQrOpen(!qrOpen)}
        >
          <img src={pixQrCode} alt="" />
        </QrContent>
      </AmoraText>
    </ReserveContent>
  );
}

const QrContent = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.black + "a2"};
  backdrop-filter: blur(3px);
  ${({ visible }) =>
    visible ? "pointer-events: all;" : "pointer-events: none;"}
`;

const Qrcode = styled.img`
  width: 80%;
`;

const PixData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const PagueComPix = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  svg {
    margin-left: 1rem;
    width: 1.6rem;
    height: 1.6rem;
    fill: ${({ theme }) => theme.color.main.dark};
    stroke: ${({ theme }) => theme.color.white};
    stroke-width: 3px;
    overflow: visible;
  }
`;

const AmoraText = styled.div`
  font-size: 1.2rem;
  width: 95%;
  text-align: center;
  margin: 0 auto;
  color: ${({ theme }) => theme.color.main.dark};
  display: flex;
  gap: 2rem;
  flex-direction: column;
`;

const ReserveContent = styled.div`
  width: 95%;
  height: 90%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`;
