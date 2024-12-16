import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import axios from "axios";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [isAdminLogin, setIsAdminLogin] = useState(false); // Toggle between User and Admin Login
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  // Dummy admin credentials
  const DUMMY_ADMIN = {
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    picture: "https://via.placeholder.com/150",
  };

  const handleLoginSuccess = async (response) => {
    try {
      const base64Url = response.credential.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      const decodedUser = JSON.parse(window.atob(base64));

      const userResponse = await axios.post(
        "http://localhost:5000/api/auth/google",
        {
          name: decodedUser.name,
          email: decodedUser.email,
          picture: decodedUser.picture,
        },
        { withCredentials: true }
      );

      setUser(userResponse.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Failed", error);
      alert("Login failed. Please try again.");
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Google Login Failed", error);
    alert("Google login failed");
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminEmail === DUMMY_ADMIN.email && adminPassword === DUMMY_ADMIN.password) {
      setUser(DUMMY_ADMIN);
      navigate("/admin-dashboard");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-blue-200">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <GiShoppingBag className="mx-auto h-16 w-16 text-emerald-500" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Fresh Picks</h2>
          <p className="mt-2 text-sm text-gray-600">
            Discover fresh, quality ingredients
          </p>
        </div>

        <div className="space-y-6">
          {!isAdminLogin && (
            <>
              {/* Google Login */}
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
                useOneTap
                render={({ onClick }) => (
                  <button
                    onClick={onClick}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <FaGoogle className="mr-2 h-5 w-5" />
                    Sign in with Google
                  </button>
                )}
              />

              {/* Guest Login */}
              <button
                onClick={() => {
                  const guestUser = {
                    name: "Guest User",
                    email: "guest@example.com",
                    picture: "https://via.placeholder.com/150",
                  };
                  setUser(guestUser);
                  navigate("/dashboard");
                }}
                className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Guest Login
              </button>
            </>
          )}

          {isAdminLogin && (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Admin Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Admin Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                Admin Login
              </button>
            </form>
          )}

          {/* Toggle Button */}
          <button
            onClick={() => setIsAdminLogin((prev) => !prev)}
            className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            {isAdminLogin ? "User Login" : "Admin Login"}
          </button>
        </div>

        <div className="text-center">
          <p className="mt-2 text-xs text-gray-600">
            By signing in, you agree to our{" "}
            <a href="#" className="text-emerald-600 hover:text-emerald-500">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
