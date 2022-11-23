import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./Routes/Home";
import Raffle from "./Routes/Raffle";
import Reserve from "./Routes/Reserve";
import AcessReserve from "./Routes/AcessReserve";
import Reserved from "./Routes/Reserved";
import Adopt from "./Routes/Adopt";

import Login from "./admin/Login";
import Logout from "./admin/Logout";
import Tickets from "./admin/Tickets";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="rifa" element={<Raffle />} />
        <Route path="rifa/reserva" element={<Reserve />} />
        <Route path="reservados" element={<Reserved />} />
        <Route path="acessar" element={<AcessReserve />} />
        <Route path="adote" element={<Adopt />} />
        <Route path="admin" element={<Login />} />
        <Route path="admin/logout" element={<Logout />} />
        <Route
          path="admin/tickets"
          element={
            <ProtectedRoute user={1}>
              <Tickets />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default AnimatedRoutes;
