import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import RaffleContext from "../../context/RaffleContext";
import Form from "./components/Form";
import Number from "./components/Number";

function Raffle() {
  const { raffleData } = useContext(RaffleContext);

  if (!raffleData?.name) return <></>;

  var numbers = [];

  for (var i = 1; i <= raffleData.number_quantity; i++) {
    let used = raffleData.number_array[i] ? true : false;

    numbers.push(
      <Number key={i} number={i} used={used} name={raffleData.number_array[i]}>
        {i}
      </Number>
    );
  }

  return (
    <RaffleContainer>
      <RaffleNumbers>
        {numbers.map((number) => {
          return number;
        })}
      </RaffleNumbers>
      <Form />
    </RaffleContainer>
  );
}

const RaffleNumbers = styled.div`
  width: 100%;
  background-color: #faa;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: auto;
  overflow-y: scroll;
`;

const RaffleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default Raffle;
