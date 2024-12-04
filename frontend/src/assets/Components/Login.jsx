import React, { useState } from 'react';
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from 'react-icons/fa';
import { GiShoppingBag } from 'react-icons/gi';
import axios from 'axios';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handles Google login success
  const handleLoginSuccess = async (response) => {
    try {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const decodedUser = JSON.parse(window.atob(base64));

      const userResponse = await axios.post('http://localhost:5000/api/auth/google', {
        name: decodedUser.name,
        email: decodedUser.email,
        picture: decodedUser.picture
      }, { withCredentials: true });

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

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/admin', adminCredentials, { withCredentials: true });
      setUser(response.data);
      navigate("/admin-dashboard");
    } catch (error) {
      setError('Invalid admin credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    const guestUser = { name: "Guest User", email: "guest@example.com", picture: "https://via.placeholder.com/150" };
    setUser(guestUser);
    navigate("/dashboard");
  };

  const regularLoginSection = (
    <>
      <div className="space-y-6">
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

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue as</span>
          </div>
        </div>

        <button
          onClick={handleGuestLogin}
          className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Guest Login
        </button>
      </div>
    </>
  );

  const adminLoginSection = (
    <form onSubmit={handleAdminLogin} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          required
          value={adminCredentials.email}
          onChange={(e) => setAdminCredentials({ ...adminCredentials, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          required
          value={adminCredentials.password}
          onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
      >
        {isLoading ? 'Logging in...' : 'Login as Admin'}
      </button>
    </form>
  );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-emerald-100 to-blue-200">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <GiShoppingBag className="mx-auto h-16 w-16 text-emerald-500" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Fresh Picks {isAdmin ? 'Admin' : ''}</h2>
          <p className="mt-2 text-sm text-gray-600">
            {isAdmin ? 'Administration Portal' : 'Discover fresh, quality ingredients'}
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isAdmin ? adminLoginSection : regularLoginSection}

        <div className="text-center">
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="text-sm text-emerald-600 hover:text-emerald-500"
          >
            {isAdmin ? 'Return to user login' : 'Admin login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
