import { motion } from "framer-motion";
import styled from "styled-components";

function QrShow({ setShowQr, showQr, pixQrCode }) {
  const ContentAnimation = {
    open: {
      opacity: [1, 1, 1, 1],
      backdropFilter: ["blur(0px)", "blur(1px)", "blur(2px)", "blur(3px)"],
      backgroundColor: [
        "rgba(0,0,0,0)",
        "rgba(0,0,0,0)",
        "rgba(0,0,0,0)",
        "rgba(0,0,0,0.7)",
      ],
      transition: {
        duration: 0.8,
      },
    },
    close: {
      opacity: [1, 1, 0],
      x: ["0%", "0%", "10%", "10%"],
      backdropFilter: ["blur(2px)", "blur(1px)", "blur(0px)", "blur(0px)"],

      backgroundColor: [
        "rgba(0,0,0,0.2",
        "rgba(0,0,0,0.0)",
        "rgba(0,0,0,0.0",
        "rgba(0,0,0,0.0)",
      ],
      transition: {
        duration: 0.8,
      },
    },
  };

  const QrAnimation = {
    open: {
      scale: [0.7, 1],
      x: ["-50vh", "0vh"],
      opacity: [0, 1],
      transition: { duration: 0.5 },
    },
    close: {
      scale: [1, 0.1],
      x: ["0vh", "50vh"],
      opacity: [1, 0],
      transition: { duration: 0.5 },
    },
  };
  return (
    <QrContent
      variants={ContentAnimation}
      animate={showQr ? "open" : "close"}
      onClick={() => setShowQr(!showQr)}
    >
      <QrImageBox
        variants={QrAnimation}
        animate={showQr ? "open" : "close"}
        transition={{ duration: 0.5 }}
      >
        <Qrcode src={pixQrCode} alt="" />
      </QrImageBox>
    </QrContent>
  );
}
export default QrShow;

const QrContent = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: ${({ theme }) => theme.color.black + "a2"};
  backdrop-filter: blur(3px);

  ${({ animate }) => {
    return animate == "open" ? "pointer-events: all;" : "pointer-events: none;";
  }}
`;

const Qrcode = styled.img`
  width: 80%;
`;

const QrImageBox = styled(motion.div)`
  width: 100%;
`;
