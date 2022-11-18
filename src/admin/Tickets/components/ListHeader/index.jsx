import styled from "styled-components";

function ListHeader({ title = "Bilhetes", pos = 2, color }) {
  return (
    <Header order={pos} color={color}>
      {title}
    </Header>
  );
}

const Header = styled.div`
  width: 100%;
  order: ${({ order }) => order};
  padding: 0;
  padding: 1rem 0;

  color: ${({ theme, color }) =>
    color && theme.color[color] ? theme.color[color] : theme.color.main.medium};
  background-color: ${({ theme }) => theme.color.white};
  border: 2px solid
    ${({ theme, color }) =>
      color && theme.color[color]
        ? theme.color[color]
        : theme.color.main.medium};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  font-family: "Pacifico";

  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;
export default ListHeader;
