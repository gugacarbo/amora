import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import { useState } from "react";
import Form from "./components/Form";

function Login() {
  const [IsAutenting, setIsAutenting] = useState(1);

  return (
    <LoginContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Header />
      <Form  />
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows: 10% auto;
  grid-template-columns: 1fr;
`;
