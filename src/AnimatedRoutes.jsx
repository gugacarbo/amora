import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./Routes/Home";
import Raffle from "./Routes/Raffle";
import Reserve from "./Routes/Reserve";
import AcessReserve from "./Routes/AcessReserve";
import Reserved from "./Routes/Reserved";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/rifa" element={<Raffle />} />
        <Route path="/rifa/reserva" element={<Reserve />} />
        <Route path="/Reservados" element={<Reserved />} />
        <Route path="/acessar" element={<AcessReserve />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
