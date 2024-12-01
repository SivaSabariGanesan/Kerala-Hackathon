import React, { useState } from 'react';

function OrderForm({ addOrder }) {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(1);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.trim()) {
      addOrder({ item, quantity });
      setItem('');
      setQuantity(1);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Place an Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="item" className="block text-gray-700 font-bold mb-2">
            Item
          </label>
          <input
            type="text"
            id="item"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default OrderForm;

