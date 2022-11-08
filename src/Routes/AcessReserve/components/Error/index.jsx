import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

function Error({ error, setError }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (error) {
      setShow(true);
      const timeout = setTimeout(() => {
        setShow(false);
        setError("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

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
      {error && <p>{error}</p>}
    </ErrorBox>
  );
}

export default Error;

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
