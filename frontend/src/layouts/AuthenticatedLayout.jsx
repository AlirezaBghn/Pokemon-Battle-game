import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";

const AuthenticatedLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default AuthenticatedLayout;
