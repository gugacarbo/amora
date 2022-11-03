import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import RaffleContext from "../../context/RaffleContext";
import { Formik } from "formik";
import InputMask from "react-input-mask";

function Raffle() {
  const {
    raffleData,
    setRaffleData,
    checked,
    setChecked,
    reserveNumbers,
    resetChecked,
  } = useContext(RaffleContext);

  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    axios.get("http://localhost/api/getRifa.php").then(({ data }) => {
      console.log(data.data);
      setRaffleData(data.data);
    });
  }, []);

  if (!raffleData?.name) return <></>;

  var numbers = [];

  for (var i = 1; i <= raffleData.number_quantity; i++) {
    let used = raffleData.number_array[i] ? true : false;

    numbers.push(
      <Number key={i} number={i} used={used}>
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
      <Formik
        initialValues={{ name: "", cpf: "", phone: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Digite Seu Nome";
          }
          const cpf = values.cpf.replace(/\D/g, "");

          if (!cpf) {
            errors.cpf = "Digite Seu CPF";
          }
          if (cpf.length < 11) {
          } else if (!validarCpf(values.cpf)) {
            errors.cpf = "CPF Inválido";
          }

          const phone = values.phone.replace(/\D/g, "");
          if (!phone || phone.length < 11) {
            errors.phone = "Digite Seu Telefone";
          }

          return errors;
        }}
        onSubmit={(clientData, { setSubmitting }) => {
          setTimeout(() => {
            reserveNumbers(clientData).then((response) => {
              console.log(response);
              axios.get("http://localhost/api/getRifa.php").then(({ data }) => {
                console.log(data.data);
                setRaffleData(data.data);
              });
              if (response.data.status >= 200 && response.data.status < 300) {
                // resetChecked();
              } else {
                if (response?.data?.used.length > 0) {
                  response.data.used.forEach((number) => {
                    setChecked(number, true);
                    console.log(number);
                  });
                } else {
                  console.log(response.data.used.length);
                }
                setErrorMessage(response.data.message);
                setTimeout(() => {
                  setErrorMessage("");
                }, 5000);
              }
            });
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <StyledForm onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && errors.name}
            </label>
            <label>
              <InputMask
                mask="999.999.999-99"
                type="text"
                name="cpf"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cpf}
              />
              {errors.cpf && touched.cpf && errors.cpf}
            </label>
            <label>
              <InputMask
                mask="(99) 9.9999-9999"
                type="text"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              {errors.phone && touched.phone && errors.phone}
            </label>
            {checked.length === 0 ? (
              <p>Selecione os números que deseja reservar</p>
            ) : (
              <>
                <p>Você selecionou os números: {checked.sort().join(", ")}</p>
                <p>
                  Valor Total R${" "}
                  {(checked.length * raffleData.number_price)
                    .toFixed(2)
                    .replace(".", ",")}
                </p>
              </>
            )}
            <NextButton
              disabled={isSubmitting || Object.keys(errors).length > 0}
            >
              Próximo
            </NextButton>
            {errorMessage && <p>{errorMessage}</p>}
          </StyledForm>
        )}
      </Formik>
    </RaffleContainer>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const NextButton = styled.button`
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #faa;
    `}
`;

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
`;

function Number({ children, used, ...props }) {
  const { checked, setChecked } = useContext(RaffleContext);
  return (
    <NumberBox
      {...props}
      checked={checked.includes(children)}
      onClick={() =>
        !used ? setChecked(children) : setChecked(children, true)
      }
      used={used}
    >
      {children}
    </NumberBox>
  );
}

export default Raffle;

function validarCpf(input) {
  const cpf = input.replace(/\D/g, "");

  if (
    cpf === "" ||
    cpf.length !== 11 ||
    !/^\d{11}$/.test(cpf) ||
    isRepeatingNumber(cpf)
  ) {
    return false;
  }

  const digits = cpf.split("").map((x) => parseInt(x));

  for (let j = 0; j < 2; j++) {
    let sum = 0;

    for (let i = 0; i < 9 + j; i++) {
      sum += digits[i] * (10 + j - i);
    }

    let checkDigit = 11 - (sum % 11);

    if (checkDigit === 10 || checkDigit === 11) {
      checkDigit = 0;
    }

    if (checkDigit !== digits[9 + j]) {
      return false;
    }
  }

  return true;
}
const isRepeatingNumber = (str) => /^(\d)(\1){10}$/.test(str);
