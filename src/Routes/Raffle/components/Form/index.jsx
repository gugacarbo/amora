import styled from "styled-components";
import InputMask from "react-input-mask";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useDetectClickOutside } from "react-detect-click-outside";
import RaffleContext from "../../../../context/RaffleContext";
import { motion } from "framer-motion";
import Loading from "../../../Loading";
import useDetectKeyboardOpen from "use-detect-keyboard-open";

function Form({ open, setOpen }) {
  

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
    <>

    </>
  );
}

export default Form;


const MotionContainer = styled(motion.div)`
  width: 100%;
  transition: 0.3s;

  ${({ isKeyboardOpen }) =>
    isKeyboardOpen
      ? `
      height: 100%;
    
  `
      : `
      height: 60vh;
  `};
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