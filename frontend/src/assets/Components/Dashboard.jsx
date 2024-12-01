import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, MinusCircle, ShoppingCart } from 'lucide-react';

const foodItems = [
  { id: 1, name: "Fresh Tomatoes", image: "https://images.unsplash.com/photo-1546470427-f5c9439c4748?w=800&auto=format&fit=crop&q=60", price: 12.99, description: "Juicy, ripe tomatoes perfect for salads or cooking." },
  { id: 2, name: "Wild-caught Salmon", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=60", price: 18.99, description: "Premium salmon fillet, rich in omega-3 fatty acids." },
  { id: 3, name: "Organic Potatoes", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop&q=60", price: 15.99, description: "Versatile, locally-sourced potatoes for all your recipes." },
  { id: 4, name: "Green Beans", image: "https://images.unsplash.com/photo-1551543837-d0a66268d755?w=800&auto=format&fit=crop&q=60", price: 7.99, description: "Crisp and tender green beans, freshly picked." },
];

export default function Dashboard({ user, setOrder }) {
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const handleQuantityChange = (id, quantity) => {
    setQuantities({ ...quantities, [id]: quantity });
  };

  const addToOrder = (item) => {
    const quantity = parseInt(quantities[item.id] || 1, 10);
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((orderItem) => orderItem.id === item.id);
      if (existingItem) {
        return prevOrder.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + quantity }
            : orderItem
        );
      } else {
        return [...prevOrder, { ...item, quantity }];
      }
    });

    setQuantities({ ...quantities, [item.id]: 1 });
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">Welcome to Fresh Picks, {user.name}!</h1>
          <p className="text-xl">Discover our selection of premium, farm-fresh ingredients.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {foodItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">${item.price.toFixed(2)}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, Math.max(1, (quantities[item.id] || 1) - 1))}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
                    >
                      <MinusCircle className="w-6 h-6 text-blue-600" />
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">{quantities[item.id] || 1}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, (quantities[item.id] || 1) + 1)}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
                    >
                      <PlusCircle className="w-6 h-6 text-blue-600" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => addToOrder(item)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

