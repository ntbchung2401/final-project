import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Shop } from "../Shop";

export default function AdminRoute({ children }) {
  const { state } = useContext(Shop);
  const { userInfo } = state;
  return userInfo && userInfo.isAdmin ? children : <Navigate to='/login' />;
}
