import styled from "styled-components";
import InputMask from "react-input-mask";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useDetectClickOutside } from "react-detect-click-outside";
import api from "../../../../util/api";
import RaffleContext from "../../../../context/RaffleContext";
import { motion } from "framer-motion";
import Loading from "../../../Loading";
import Error from "../Error";

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
    boughtNumbers,
    setBoughtNumbers,
    resetClientData,
  } = useContext(RaffleContext);

  const navigate = useNavigate();

  if (clientData == null) return <></>;

  return (
    <>
      <Error error={errorMessage} setError={setErrorMessage} />

      <MotionContainer
        initial={{ opacity: 0, y: "100%" }}
        animate={{
          opacity: 1,
          y: "0%",
          transition: {
            delay: 0.4,
            duration: 0.5,
          },
        }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        <Formik
          initialValues={{
            cpf: "",
            phone: "",
          }}
          validate={(values) => {
            const errors = {};

            const cpf = values.cpf.replace(/\D/g, "");

            if (!cpf) {
              errors.cpf = "Digite Seu CPF";
            }
            if (cpf.length < 11) {
              errors.cpf = "";
            }

            if (!validarCpf(values.cpf) && cpf.length === 11) {
              errors.cpf = "CPF Inválido";
            }

            const phone = values.phone.replace(/\D/g, "");

            if (!phone) {
              errors.phone = "Digite Seu Telefone";
            }
            if (phone.length < 11) {
              errors.phone = "";
            }

            return errors;
          }}
          onSubmit={({ cpf, phone }, { setSubmitting, setValues }) => {
            api
              .get("/getClientNumbers.php?cpf=" + cpf + "&phone=" + phone)
              .then(({ data }) => {
                if (data.status >= 200 && data.status < 300) {
                  setClientNumbers(data.numbers);
                  setClientData(data.client);
                  setClientToken(data.token);
                } else {
                  resetClientData();
                  setErrorMessage(data.message);
                }
              })
              .catch((err) => {
                resetClientData();
              })
              .finally(() => {
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
            <>
              {isSubmitting && <Loading />}
              <StyledForm onSubmit={handleSubmit}>
                <Label>
                  <span>CPF</span>
                  <StyledInput
                    as={InputMask}
                    mask="999.999.999-99"
                    maskChar={null}
                    alwaysShowMask={false}
                    type="text"
                    name="cpf"
                    placeholder="Digite seu CPF"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cpf}
                    error={errors.cpf && touched.cpf && errors.cpf}
                  />
                  <small>{errors.cpf && touched.cpf && errors.cpf}</small>
                </Label>
                <Label>
                  <span>Telefone</span>
                  <StyledInput
                    as={InputMask}
                    alwaysShowMask={false}
                    maskChar={null}
                    mask="(99) 9.9999-9999"
                    type="text"
                    name="phone"
                    placeholder="Digite seu telefone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    error={errors.phone && touched.phone && errors.phone}
                  />
                  <small>{errors.phone && touched.phone && errors.phone}</small>
                </Label>

                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                >
                  Acessar
                </Button>
              </StyledForm>
            </>
          )}
        </Formik>
      </MotionContainer>
    </>
  );
}

export default Form;

const Label = styled.label`
  width: 100%;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 1fr 1fr;
  place-items: center left;

  span {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    font-size: 1.2rem;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    color: ${({ theme }) => theme.color.main.dark};
  }
  small {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    color: ${({ theme }) => theme.color.main.darker};
    font-family: "Poppins";
    font-weight: 600;
    font-size: 1rem;
  }
`;

const StyledInput = styled(motion.input)`
  width: 100%;
  height: 100%;
  border: none;
  padding: 0.3rem 1rem;
  font-size: 1.1rem;
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.black};
  border-radius: 5rem;
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  border: 2px solid ${({ theme }) => theme.color.main.color};
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.color.lightGray};
  }
  ${({ error, theme }) =>
    error &&
    `
      border-color: ${theme.color.main.darker};
    `}
`;

const MotionContainer = styled(motion.div)`
  width: 100%;
  background: ${(props) => props.theme.color.white};
  display: flex;

  align-items: center;
  flex-direction: column;
`;

const StyledForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: center;
  gap: 2rem;
  align-items: center;
  margin-top: 20%;
  margin-bottom: auto;
`;

const Button = styled(motion.div)`
  background-color: ${({ theme }) => theme.color.main.complement};

  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  transition: ${({ theme }) => theme.transition.slow};
  width: 70%;
  text-align: center;
  border: 1px solid transparent;
  margin: 0.5rem;
  cursor: pointer;

  color: ${({ theme }) => theme.color.white};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.main.medium};
    border: 1px solid ${({ theme }) => theme.color.main.color};
    box-shadow: 0 0 0.2rem 0.2rem ${({ theme }) => theme.color.main.light};
  }

  ${({ disabled, theme }) =>
    disabled &&
    `
     background-color: ${theme.color.main.dark};
      opacity: 0.5;
      filter: grayscale(20%);
      pointer-events: none;
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
