import styled from "styled-components";
import InputMask from "react-input-mask";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

import api from "../../../../util/api";
import RaffleContext from "../../../../context/RaffleContext";

function Form() {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    raffleData,
    setRaffleData,
    checked,
    setChecked,
    clientData,
    setClientData,
    setClientToken,
    reserveNumbers,
    resetChecked,
    removeChecked,
    clientNumbers,
    setClientNumbers,
  } = useContext(RaffleContext);

  const navigate = useNavigate();

  function handleErrorMessage(message) {
    setErrorMessage(message);
    const timeout = setTimeout(() => {
      setErrorMessage("");
    }, 5000);
    return () => clearTimeout(timeout);
  }
  if (clientData == null) return <></>;

  return (
    <Formik
      initialValues={clientData}
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
      onSubmit={(clientData, { setSubmitting, setValues }) => {
        reserveNumbers(clientData)
          .then((response) => {
            if (response.data.status >= 200 && response.data.status < 300) {
              setClientData(response.data.client);
              setClientNumbers(response.data.client_numbers);
              setClientToken(response.data.token);
              setValues(response.data.client);
              
              resetChecked();

              // navigate("/rifa/reserva");
            } else {
              
              if (response?.data?.used) {
                removeChecked(response.data.used);
              }

              if (response?.data?.invalid) {
                removeChecked(response.data.invalid);
              }

              handleErrorMessage(response.data.message);
            }
          })
          .finally(() => {
            api.get("/getRifa.php").then(({ data }) => {
              setRaffleData(data.data);
            });
            setSubmitting(false);
          });
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
          {checked.length > 0 && (
            <NextButton
              disabled={isSubmitting || Object.keys(errors).length > 0}
            >
              Reservar
            </NextButton>
          )}
          {errorMessage && <p>{errorMessage}</p>}
          {clientNumbers.length > 0 && (
            <p>
              Seus Números : {clientNumbers.sort((a, b) => a - b).join(", ")}
            </p>
          )}
        </StyledForm>
      )}
    </Formik>
  );
}

export default Form;

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
