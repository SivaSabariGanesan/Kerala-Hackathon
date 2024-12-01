import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CancelOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reason, setReason] = useState('');

  const handleCancel = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/cancel/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }

      navigate('/orders');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Cancel Order #{id}</h1>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Reason for cancellation"
        className="w-full border rounded p-2 mb-4"
      />
      <button
        onClick={handleCancel}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Confirm Cancellation
      </button>
    </div>
  );
};

export default CancelOrder;
