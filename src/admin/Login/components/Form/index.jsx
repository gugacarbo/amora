import styled from "styled-components";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { motion } from "framer-motion";
import api from "../../../util/api";
import AdminContext from "../../../context/AdminContext";
function Form() {
  const navigate = useNavigate();

  const { token, setToken } = useContext(AdminContext);
  return (
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
          user: "",
          password: "",
        }}
        enableReinitialize={true}
        validate={(values) => {
          const errors = {};

          //const user = values.user.replace(/\D/g, "");

          if (!values.user) {
            errors.user = "Digite Seu Usuário";
          }

          if (!values.password) {
            errors.password = "Digite Seu Senha";
          }

          return errors;
        }}
        onSubmit={({ user, password }, { setSubmitting, setValues }) => {
          api
            .post("/login.php", { user, password })
            .then(({ data }) => {
              if (data.status == 200 && data?.token) {
                setToken(data.token);
                navigate("/admin/tickets");
              } else {
                alert(data.message);
              }
            })
            .catch((e) => {
              alert("Um erro Aconteceu");
            });
          setSubmitting(false);
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
            <StyledForm onSubmit={handleSubmit}>
              <Label>
                <span>Usuário</span>
                <StyledInput
                  type="text"
                  name="user"
                  placeholder="Usuário"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.user}
                  error={errors.user && touched.user && errors.user}
                />
                <small>{errors.user && touched.user && errors.user}</small>
              </Label>
              <Label>
                <span>Senha</span>
                <StyledInput
                  type="password"
                  name="password"
                  placeholder="Senha"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={errors.password && touched.password && errors.password}
                />
                <small>
                  {errors.password && touched.password && errors.password}
                </small>
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
