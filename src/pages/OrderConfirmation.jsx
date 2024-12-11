import React from 'react';

const OrderConfirmation = () => {
  return (
    <div className="p-5 text-center">
      <h1 className="text-3xl font-bold text-green-600">Order Successfully Placed!</h1>
      <p className="mt-4 text-lg">Thank you for your purchase. Your order is now being processed.</p>
      <button
        onClick={() => window.location.href = '/'} // Redirect to home
        className="bg-amber-600 text-white py-2 px-4 mt-6"
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderConfirmation;
