import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Package, Truck, CheckCircle } from 'lucide-react';

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const orderStatuses = {
    'Pending': { 
      icon: <Package className="w-8 h-8 text-yellow-500" />,
      description: 'Your order is being processed'
    },
    'Shipped': { 
      icon: <Truck className="w-8 h-8 text-blue-500" />,
      description: 'Your order is on its way'
    },
    'Delivered': { 
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      description: 'Order has been delivered'
    }
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
        console.log('Order data:', response.data); // Debugging line
        setOrder(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch order details:', err);
        setError(err.response?.data?.message || 'Failed to load order details');
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Order #{orderId}</h2>
            <div className="flex items-center space-x-2">
              {orderStatuses[order.status]?.icon}
              <span className="text-gray-600">
                {orderStatuses[order.status]?.description}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-md" 
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-gray-600">
                        Quantity: {item.quantity} | ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p><strong>Address:</strong> {order.address.street}</p>
                <p>{order.address.city}, {order.address.state} {order.address.zip}</p>
                <p>{order.address.country} </p>
              </div>

              <h3 className="text-xl font-semibold mb-4 mt-6">Payment Method</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Mode of Payment:</strong> {order.paymentMethod && order.paymentMethod !== '' ? order.paymentMethod : 'Not Provided'}</p>
                {order.paymentMethod === 'Online' && (
                  <p><strong>Mobile:</strong> {order.mobilePayment ? order.mobilePayment : 'Not Provided'}</p>
                )}
              </div>

              <h3 className="text-xl font-semibold mb-4 mt-6">Order Summary</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
