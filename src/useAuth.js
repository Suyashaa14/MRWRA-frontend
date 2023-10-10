import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    const jwtToken = localStorage.getItem("jwtToken");
    return !!jwtToken;
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  return {
    isAuthenticated,
    redirectToLogin,
  };
}
