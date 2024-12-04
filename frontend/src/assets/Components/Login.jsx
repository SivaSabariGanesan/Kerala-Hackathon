import React, { useState } from 'react';

const Alert = ({ children }) => (
  <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg">
    {children}
  </div>
);

const Login = ({ setUser, onNavigate }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGuestLogin = () => {
    const guestUser = {
      name: "Guest User",
      email: "guest@example.com",
      picture: "/api/placeholder/150/150"
    };
    setUser(guestUser);
    onNavigate("/dashboard");
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) throw new Error('Login failed');
      
      const userData = await response.json();
      setUser({ ...userData, isAdmin: true });
      onNavigate("/admin/dashboard");
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const regularLoginSection = (
    <>
      <div className="space-y-6">
        <button
          onClick={() => onNavigate("/auth/google")}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <span className="mr-2">G</span>
          Sign in with Google
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue as
            </span>
          </div>
        </div>

        <button 
          onClick={handleGuestLogin}
          className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Guest Login
        </button>
      </div>

      <div className="text-center">
        <p className="mt-2 text-xs text-gray-600">
          By signing in, you agree to our{" "}
          <button className="text-emerald-600 hover:text-emerald-500">
            Terms of Service
          </button>
        </p>
      </div>
    </>
  );

  const adminLoginSection = (
    <form onSubmit={handleAdminSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-blue-200">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 text-emerald-500 text-4xl font-bold flex items-center justify-center border-2 border-emerald-500 rounded-full">
            FP
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Fresh Picks {isAdmin ? 'Admin' : ''}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isAdmin ? 'Administration Portal' : 'Discover fresh, quality ingredients'}
          </p>
        </div>

        {error && <Alert>{error}</Alert>}

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