import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access passed state
import { products } from '../products'; // Import products array

const Checkout = () => {
  const location = useLocation(); // Access location object
  const { cartItems } = location.state || {}; // Destructure cartItems from state

  const [cartDetails, setCartDetails] = useState([]);

  useEffect(() => {
    if (cartItems) {
      // Fetch product details for each item in the cart
      const updatedCartDetails = cartItems.map((item) => {
        const product = products.find((product) => product.id === item.productId);
        return { ...item, product }; // Merge product details with cart item
      });
      setCartDetails(updatedCartDetails);
    }
  }, [cartItems]);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted with:', formData);
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl">Checkout</h2>

      {/* Display Cart Items */}
      <div className="my-5">
        <h3 className="text-xl">Your Cart</h3>
        <ul>
          {cartDetails && cartDetails.map((item, index) => (
            <li key={index} className="flex justify-between items-center mb-4">
              <img src={item.product.image} alt={item.product.name} className="w-16" />
              <div>
                <p>{item.product.name}</p>
                <p>Price: ${item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${item.product.price * item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="name" className="block">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border border-gray-300 w-full"
            required
          />
        </div>

        <div className="my-3">
          <label htmlFor="address" className="block">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="p-2 border border-gray-300 w-full"
            required
          />
        </div>

        <div className="my-3">
          <label htmlFor="cardNumber" className="block">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="p-2 border border-gray-300 w-full"
            required
          />
        </div>

        <div className="my-3 flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="expirationDate" className="block">Expiration Date</label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className="p-2 border border-gray-300 w-full"
              required
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="cvv" className="block">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className="p-2 border border-gray-300 w-full"
              required
            />
          </div>
        </div>

        <button type="submit" className="bg-amber-600 text-white py-2 px-4 mt-4">
          Complete Purchase
        </button>
      </form>
    </div>
  );
};

export default Checkout;
