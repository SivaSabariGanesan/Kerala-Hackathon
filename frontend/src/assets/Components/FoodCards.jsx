import React from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FoodCard({ item, quantity, onQuantityChange, onAddToOrder }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-200 hover:scale-[1.02] hover:shadow-xl">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="font-semibold text-blue-600">${item.price.toFixed(2)}</span>
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 mb-3">{item.name}</h2>

        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-2">
            <button
              onClick={() => onQuantityChange(item.id, Math.max(1, (quantity || 1) - 1))}
              className="p-1 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <span className="font-medium text-gray-800 min-w-[20px] text-center">
              {quantity || 1}
            </span>
            <button
              onClick={() => onQuantityChange(item.id, (quantity || 1) + 1)}
              className="p-1 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <button
            onClick={() => onAddToOrder(item)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}