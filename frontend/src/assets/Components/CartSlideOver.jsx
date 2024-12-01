import React from 'react';
import PropTypes from 'prop-types';
import { X, ShoppingBag, Package, Clock, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CartSlideOver({ isOpen, onClose, order, setOrder }) {
  const navigate = useNavigate();

  const subtotal = order.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems: order } });
    onClose();
  };

  const handleRemoveItem = (itemToRemove) => {
    if (typeof setOrder !== 'function') {
      console.error('setOrder is not a function');
      return;
    }
    setOrder(prevOrder => prevOrder.filter(item => item.id !== itemToRemove.id));
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    if (typeof setOrder !== 'function') {
      console.error('setOrder is not a function');
      return;
    }
    if (newQuantity < 1) {
      handleRemoveItem(item);
      return;
    }
    setOrder(prevOrder => prevOrder.map(orderItem => 
      orderItem.id === item.id 
        ? { ...orderItem, quantity: newQuantity }
        : orderItem
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-gray-700 bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full">
        <div className="w-screen max-w-md transform transition-transform ease-in-out duration-300 bg-white shadow-lg">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <ShoppingBag className="w-6 h-6 mr-2" />
              Your Cart
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {order.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="w-16 h-16 mb-4" />
                <p className="text-xl font-medium">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {order.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <div className="flex items-center space-x-2 mt-2">
                          <button 
                            onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                            className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            -
                          </button>
                          <span className="text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                            className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button 
                        onClick={() => handleRemoveItem(item)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {order.length > 0 && (
            <div className="border-t px-6 py-4">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center">
                    <Package className="w-4 h-4 mr-2" />
                    Shipping
                  </span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-800 border-t pt-3">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-200 text-lg font-semibold flex items-center justify-center space-x-3"
                >
                  <ShoppingBag className="w-6 h-6" />
                  <span>Proceed to Checkout</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition duration-200 flex items-center justify-center space-x-3"
                >
                  <Clock className="w-6 h-6" />
                  <span>Continue Shopping</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

