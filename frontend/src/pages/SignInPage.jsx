import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backendAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await backendAPI.get("/api/check-session");
        if (response.data.authenticated) {
          setIsAuthenticated(true);
          navigate("/");
        }
      } catch (error) {
        console.error("Error verifying session", error);
      }
    };
    verifySession();
  }, [setIsAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting sign in with:", { email, password });
      const response = await backendAPI.post("/api/login", { email, password });
      console.log("Sign in response:", response.data);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      console.error("Error signing in:", err);
      alert(err.response?.data?.message || "Error signing in");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-md w-full bg-gray-900 border border-green-500 p-8 rounded-lg shadow-xl text-lime-400">
        <h2 className="text-4xl font-bold mb-6 text-center drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-gray-800 text-lime-400 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-gray-800 text-lime-400 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-black p-3 rounded font-bold"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignInPage;
