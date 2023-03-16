import React from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Login from "./pages/Login";
import SignUpPage from "./SignUpPage";
import Dashboard from "./Dashboard";
import ScheduleAppointment from "./ScheduleAppointment";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<SignUpPage />} />
      <Route path="/inicio" element={<Dashboard />} />
      <Route path="/agendar-consulta" element={<ScheduleAppointment />} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
