import React from "react";
import { Navigate, Outlet } from "react-router-dom";

//유저인증 정보가 있으면 Outlet 요청한 주소로 이동 없으면 로그인페이지
const ProtectedRoute = ({ user }) => {
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
