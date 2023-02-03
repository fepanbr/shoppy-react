import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredAdmin }) {
  // 로그인한 사용자가 있는지 확인
  // 그 사용자가 어드민 권한이 있는지 확인
  // requiredAdmin이 true인 경우에는 로그인도 되어 있어야 하고, 어드민 권한도 가지고 있어야 함.
  // 조건이 맞지 않는 경우 / 상위 경로로 이동!
  // 조건이 맞는 경우 라우팅

  const { user } = useAuthContext();

  if (!user || (requiredAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
