import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "./Login";
import Tickets from "./Tickets";

function AdminRoutes() {
  const Auth = 0;
  return (
    <>
      <Route path="/admin" element={<Login />}>
        <Route path="/admin/tickets" element={<Tickets />} />
        <Route path="/admin/ticket2" element={<Tickets />} />
      </Route>
    </>
  );
}

export default AdminRoutes;
