import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { data: user, isLoading } = useUser();

  // 1. While checking the session, show a loading screen
  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <h2>Verifying Session...</h2>
      </div>
    );
  }

  // 2. If user exists, render the child component (Outlet)
  // 3. If not, redirect to Login
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
