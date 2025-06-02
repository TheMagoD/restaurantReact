import { Navigate } from "react-router-dom";

const isTokenValid = (): boolean => {
  const token = localStorage.getItem("token");
  const expiration = localStorage.getItem("token_expiration");

  if (!token || !expiration) return false;

  const now = Date.now();
  if (now > Number(expiration)) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("token_expiration");
    return false;
  }

  return true;
};

const PrivateRoute = ({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string;
}) => {
  const userRole = localStorage.getItem("role");

  if (!isTokenValid() || userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
