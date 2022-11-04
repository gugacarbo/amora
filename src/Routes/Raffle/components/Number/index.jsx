import { useContext } from "react";
import styled from "styled-components";
import RaffleContext from "../../../../context/RaffleContext";

function Number({ children, used, name, ...props }) {
  const { checked, setChecked, clientNumbers, clientData } =
    useContext(RaffleContext);
  return (
    <NumberBox
      {...props}
      checked={checked.includes(children)}
      clientChecked={clientNumbers.includes(children)}
      onClick={() => (!used ? setChecked(children) : removeChecked(children))}
      used={used}
    >
      {children}
      {/* <Name>{clientNumbers.includes(children) ? clientData.name :name}</Name> */}
      <Name>{name}</Name>
    </NumberBox>
  );
}
export default Number;

const NumberBox = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  background-color: #ddd;
  display: flex;
  border: 1px solid #000;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.main};
  position: relative;
  ${({ used }) =>
    used &&
    `
    background-color: #000;
    color: #fff;
    cursor: default;
    `}
  ${({ checked }) =>
    checked &&
    `
    background-color: #040;
    color: #fff;
    `}
  ${({ clientChecked }) =>
    clientChecked &&
    `
    background-color: #ff82c3 ;
    color: #fff;
    `}
`;

const Name = styled.small`
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 0.8rem;
`;
