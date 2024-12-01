import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users and orders data
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const userResponse = await fetch('http://localhost:5000/api/admin/users', {
          method: 'GET',
          credentials: 'include', // Ensure cookies are sent with request
        });
        const orderResponse = await fetch('http://localhost:5000/api/admin/orders', {
          method: 'GET',
          credentials: 'include',
        });

        if (userResponse.ok && orderResponse.ok) {
          const usersData = await userResponse.json();
          const ordersData = await orderResponse.json();

          setUsers(usersData);
          setOrders(ordersData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Avatar</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <img src={user.avatar} alt={user.name} width="50" height="50" />
              </td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Status</th>
            <th>Total</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user.name}</td>
              <td>{order.status}</td>
              <td>{order.total}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
