import React from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";

const LogoutForm = () => {
  const { handleLogout } = useAuth();

  return <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>;
};

export default LogoutForm;

// style
const LogoutBtn = styled.button`
  font-size: 1.2rem;
  font-weight: 600;
  color: #3d7685;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }

  @media (max-width: 1440px) {
    font-size: 0.8rem;
  }
`;
