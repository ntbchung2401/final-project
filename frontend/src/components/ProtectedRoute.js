import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Shop } from "../Shop";

export default function ProtectedRoute({ children }) {
  const { state } = useContext(Shop);
  const { userInfo } = state;
  return userInfo ? children : <Navigate to='/login' />;
}
