import styled from "styled-components";
import Payment from "./components/Payment";
import Contact from "./components/Contact";

function ReserveContent() {
  return (
    <ReserveContainer>
      <Title>
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

const Title = styled.h3`
  font-size: 1.2rem;
  width: 100%;
  padding: 0.5rem 0;
  text-align: center;
  background-color: #fff;
  color: ${({ theme }) => theme.color.main.dark};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
