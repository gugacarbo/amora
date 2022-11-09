import styled from "styled-components";
import Payment from "./components/Payment";
import Contact from "./components/Contact";
import { motion } from "framer-motion";

function ReserveContent() {
  return (
    <ReserveContainer>
      <Title
        initial={{ opacity: 0, x: "-100%" }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { delay: 0.4, duration: 0.5 },
        }}
        exit={{
          opacity: 0,
          x: "100%",
          transition: { delay: 0.2, duration: 0.5 },
        }}
      >
        A Amora agradece a sua contribuição e deseja boa sorte! Au Au!
      </Title>
      <Payment />
      <Contact />
    </ReserveContainer>
  );
}
export default ReserveContent;

const ReserveContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
`;

const Title = styled(motion.h3)`
  font-size: 1.2rem;
  width: 100%;

  padding: 0.5rem 2rem;
  text-align: center;
  background-color: #fff;
  color: ${({ theme }) => theme.color.main.dark};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
