import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './assets/Components/Login';
import Dashboard from './assets/Components/Dashboard';
import Checkout from './assets/Components/checkout';
import Header from './assets/Components/Header';
import Profile from './assets/Components/Profile';
import MyOrders from './assets/Components/Myorders';
import CancelOrder from './assets/Components/cancelorder';

export default function App() {
  const [user, setUser] = useState(null); // No localStorage, just session-based state
  const [order, setOrder] = useState([]);

  const handleCheckout = (navigate) => {
    console.log('Proceeding to checkout');
    navigate('/checkout');
  };

  const handleViewHistory = () => {
    console.log('Viewing order history');
  };

  const handleLogin = (newUser) => {
    setUser(newUser); // Set the user directly to state
  };

  return (
    <GoogleOAuthProvider clientId="179047694565-gjv2b779lt37ofj82ntni43dco5ppgb8.apps.googleusercontent.com">
      <Router>
        <div className="min-h-screen bg-gray-100">
          {user && (
            <Header
              order={order}
              onCheckout={handleCheckout}
              onViewHistory={handleViewHistory}
              user={user}
              setUser={setUser}
            />
          )}
          <Routes>
            <Route path="/" element={<Login setUser={handleLogin} />} />
            {/* No ProtectedRoute, user will be able to access these routes if logged in */}
            <Route path="/dashboard" element={user ? <Dashboard user={user} setOrder={setOrder} /> : <Navigate to="/" />} />
            <Route path="/checkout" element={user ? <Checkout order={order} /> : <Navigate to="/" />} />
            <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/" />} />
            <Route path="/my-orders" element={user ? <MyOrders user={user} /> : <Navigate to="/" />} />
            <Route path="/cancel-order/:orderId" element={user ? <CancelOrder /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}
