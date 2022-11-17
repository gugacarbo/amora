import { motion } from "framer-motion";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import RaffleContext from "../../context/RaffleContext";

function ErrorMessage() {
  const { errorMessage, setErrorMessage } = useContext(RaffleContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setShow(true);
      const timeout = setTimeout(() => {
        setShow(false);
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);

  const ErrorAnimations = {
    hidden: {
      opacity: 1,
      y: "-100%",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <ErrorBox
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      variants={ErrorAnimations}
    >
      {errorMessage && <p>{errorMessage}</p>}
    </ErrorBox>
  );
}

export default ErrorMessage;

const ErrorBox = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  background: ${({ theme }) => theme.color.white + "dd"};
  border-bottom: 1rem solid ${({ theme }) => theme.color.main.dark};
  padding: 5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    width: 90%;
    text-align: center;
    font-size: 1.25rem;
  }
`;
