import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { backendAPI } from "../services/api";

const SignOutButton = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await backendAPI.post("/api/logout");
      setIsAuthenticated(false);
      navigate("/signin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-green-600 hover:bg-green-500 text-black font-bold py-2 px-4 rounded shadow-lg"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
