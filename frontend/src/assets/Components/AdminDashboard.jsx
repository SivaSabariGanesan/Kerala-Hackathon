import React from "react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800">Welcome, Admin!</h1>
        <p className="mt-4 text-gray-600">
          Manage your application from this dashboard.
        </p>
        <div className="mt-6">
          <button
            onClick={() => alert("Manage Users")}
            className="px-6 py-3 text-white bg-emerald-600 rounded-lg shadow hover:bg-emerald-700"
          >
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
