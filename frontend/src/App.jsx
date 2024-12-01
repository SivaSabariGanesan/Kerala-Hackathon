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
import AdminDashboard from './assets/Components/Admin'; 

export default function App() {
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState([]);

  const handleCheckout = (navigate) => {
    console.log('Proceeding to checkout');
    navigate('/checkout');
  };

  const handleViewHistory = () => {
    console.log('Viewing order history');
  };

  const ProtectedRoute = ({ children, role }) => {
    return user && user.role === role ? children : <Navigate to="/" />;
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
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute role="customer">
                  <Dashboard user={user} setOrder={setOrder} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute role="customer">
                  <Checkout order={order} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute role="customer">
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute role="customer">
                  <MyOrders user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cancel-order/:orderId"
              element={
                <ProtectedRoute role="customer">
                  <CancelOrder />
                </ProtectedRoute>
              }
            />
            {/* Admin Dashboard Route */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}
