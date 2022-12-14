import styled from "styled-components";
import InputMask from "react-input-mask";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useDetectClickOutside } from "react-detect-click-outside";
import { motion } from "framer-motion";

import Loading from "../../../Loading";
import RaffleContext from "../../../../context/RaffleContext";
import { use100vh } from "react-div-100vh";

function Form({ open, setOpen }) {
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
    getRifa,
    removeChecked,
    clientNumbers,
    setClientNumbers,
    openFormButtonRef,
    boughtNumbers,
    setBoughtNumbers,
    errorMessage,
    setErrorMessage,
  } = useContext(RaffleContext);

  const navigate = useNavigate();

  const ref = useDetectClickOutside({ onTriggered: handleCloseForm });

  const [maxHei, setMaxHei] = useState(0);
  const HeightSz = use100vh();

  useEffect(() => {
    if (HeightSz > maxHei) {
      setMaxHei(HeightSz);
    }
  }, [HeightSz]);

  function handleCloseForm(e) {
    if (e.target === openFormButtonRef?.current) return;
    setOpen(false);
  }
  const animate = {
    disabled: {
      opacity: 0.3,
      y: "100%",
      transition: {
        duration: 0.8,
      },
    },
    close: {
      opacity: 1,
      y: "100%",
      transition: {
        duration: 0.8,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };
  if (clientData?.name == null) return <></>;
  return (
    <>
      <MotionContainer
        initial="close"
        animate={checked.length > 0 ? (open ? "open" : "close") : "disabled"}
        variants={animate}
        isKeyboardOpen={HeightSz < maxHei * 0.8 ? 1 : 0}
        ref={ref}
        exit="exit"
      >
        <Formik
          initialValues={clientData}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Digite Seu Nome";
            }

            if (!values.lastName) {
              errors.lastName = "Digite Seu ??ltimo nome";
            }

            const cpf = values.cpf.replace(/\D/g, "");

            if (!cpf) {
              errors.cpf = "Digite Seu CPF";
            }
            if (cpf.length < 11) {
            } else if (!validarCpf(values.cpf)) {
              errors.cpf = "CPF Inv??lido";
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
                  setBoughtNumbers(response.data.numbers);
                  navigate("/rifa/reserva");
                } else {
                  if (response?.data?.used) {
                    removeChecked(response.data.used);
                  }

                  if (response?.data?.invalid) {
                    removeChecked(response.data.invalid);
                  }

                  setErrorMessage(response.data.message);
                }
              })
              .catch(() => {
                setErrorMessage(
                  "Um Erro Aconteceu, Tente Novamente Mais Tarde"
                );
              })
              .finally(() => {
                getRifa();
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
          }) => (
            <>
              {isSubmitting && <Loading />}
              <StyledForm onSubmit={handleSubmit}>
                <Label>
                  <span>Nome</span>
                  <StyledInput
                    type="text"
                    name="name"
                    maxLength={30}
                    placeholder="Digite seu nome"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={errors.name && touched.name && errors.name}
                  />
                  <small>{errors.name && touched.name && errors.name}</small>
                </Label>

                <Label>
                  <span>Sobrenome</span>
                  <StyledInput
                    type="text"
                    maxLength={30}
                    name="lastName"
                    placeholder="Digite seu ??ltimo nome"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    error={
                      errors.lastName && touched.lastName && errors.lastName
                    }
                  />
                  <small>
                    {errors.lastName && touched.lastName && errors.lastName}
                  </small>
                </Label>
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

                {checked.length > 0 && (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                  >
                    Reservar
                  </Button>
                )}
              </StyledForm>
            </>
          )}
        </Formik>
      </MotionContainer>
    </>
  );
}

export default Form;

const MotionContainer = styled(motion.div)`
  width: 100%;
  transition: 0.3s;
  height: 60vh;

  ${({ isKeyboardOpen }) => {
    return isKeyboardOpen == 1
      ? `
      
      height: 95%;
      
      `
      : `
    
    `;
  }}
  position: absolute;
  bottom: 0;
  left: 0;
  background: ${(props) => props.theme.color.main.light};
  border: 1px solid ${(props) => props.theme.color.main.medium};
  border-top: 1rem solid ${(props) => props.theme.color.main.medium};
  border-radius: 0.5rem 0.5rem 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 15;
  &::before {
    content: "";
    border-radius: 5rem;
    position: absolute;
    top: -0.5rem;
    width: 80%;
    height: 0.15rem;
    background: ${(props) => props.theme.color.lightGray};
  }
`;

const StyledForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 90%;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  width: 100%;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 1fr 1fr;
  place-items: center left;

  span {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    font-size: 1.1rem;
    font-weight: 800;
    color: ${({ theme }) => theme.color.white};
  }
  small {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    color: ${({ theme }) => theme.color.white};
    font-family: "Poppins";
    font-weight: 600;
    font-size: 1rem;
  }
`;

const StyledInput = styled.input`
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
  border: 2px solid ${({ theme }) => theme.color.white};
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
    color: ${({ theme }) => theme.color.main.white};
    background-color: ${({ theme }) => theme.color.white};
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.color.main.white};
    box-shadow: 0 0 0.2rem 0.2rem ${({ theme }) => theme.color.main.white};
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
