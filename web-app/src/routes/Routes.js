import React from "react";

import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AdminSignIn from "../pages/admins/AdminSignIn";
import PrivateRoute from "../component/PrivateRoute";
import AdminLayout from "../pages/admins/AdminLayout";
import ClientLayout from "../pages/client/ClientLayout";
import ClientSignUp from "../pages/client/ClientSignUp";
import ClientSignIn from "../pages/client/ClientSignIn";

const AppRoutes = [
  // Client routes
  <Route
    key={1}
    path="/"
    exact
    element={<Navigate replace to={"/client/home"} />}
  />,
  <Route key={2} path="/client/home" element={<ClientLayout />} />,
  // Admin routes
  <Route key={11} path="/admin/*" element={<PrivateRoute element={AdminLayout}/>} />,
  // // Other routes
  <Route key={11} path="/admin/sign-in" element={<AdminSignIn />} />,
  <Route key={11} path="/client/sign-in" element={<ClientSignIn />} />,
  <Route key={11} path="/client/sign-up" element={<ClientSignUp />} />,
  // <Route key={11} path="/client/profile" element={<ClientProfile />} />,
  // <Route key={11} path="/payment/success" element={<PaymentSuccess />} />,
];

export default AppRoutes;