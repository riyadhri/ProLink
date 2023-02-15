import { Navigate, Outlet } from "react-router-dom";
import React, { Component } from "react";

export const useAuth = () => {
  const user = { loggedIn: true };
  return user && user.loggedIn;
};

export const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return <>{isAuth ? <Outlet /> : <Navigate to="/" />}</>;
};
