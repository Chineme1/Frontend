import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { products } from '../products';

const Checkout = () => {
  const location = useLocation();
  const { cartItems } = location.state || {};

  const [cartDetails, setCartDetails] = useState([]);
  const [errors, setErrors] = useState({}); // State for error messages

  useEffect(() => {
    if (cartItems) {
      const updatedCartDetails = cartItems.map((item) => {
        const product = products.find((product) => product.id === item.productId);
        return { ...item, product };
      });
      setCartDetails(updatedCartDetails);
    }
  }, [cartItems]);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const validateCardNumber = (number) => {
    const regex = /^[0-9]{16}$/;
    return regex.test(number);
  };

  const validateExpirationDate = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Format: MM/YY
    return regex.test(date);
  };

  const validateCVV = (cvv) => {
    const regex = /^[0-9]{3}$/;
    return regex.test(cvv);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset errors as user types
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = {};

    // Name and address validation
    if (!formData.name.trim()) {
      isValid = false;
      newErrors.name = 'Name is required.';
    }
    if (!formData.address.trim()) {
      isValid = false;
      newErrors.address = 'Address is required.';
    }

    // Card number validation
    if (!validateCardNumber(formData.cardNumber)) {
      isValid = false;
      newErrors.cardNumber = 'Card number must be 16 digits.';
    }

    // Expiration date validation
    if (!validateExpirationDate(formData.expirationDate)) {
      isValid = false;
      newErrors.expirationDate = 'Expiration date must be in MM/YY format.';
    }

    // CVV validation
    if (!validateCVV(formData.cvv)) {
      isValid = false;
      newErrors.cvv = 'CVV must be 3 digits.';
    }

    setErrors(newErrors);

    if (isValid) {
      console.log('Form submitted with:', formData);
      // Proceed with form submission logic
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl">Checkout</h2>

      {/* Display Cart Items */}
      <div className="my-5">
        <h3 className="text-xl">Your Cart</h3>
        <ul>
          {cartDetails &&
            cartDetails.map((item, index) => (
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
          <label htmlFor="name" className="block">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border border-gray-300 w-full"
            required
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div className="my-3">
          <label htmlFor="address" className="block">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="p-2 border border-gray-300 w-full"
            required
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </div>

        <div className="my-3">
          <label htmlFor="cardNumber" className="block">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="p-2 border border-gray-300 w-full"
            required
          />
          {errors.cardNumber && <p className="text-red-500">{errors.cardNumber}</p>}
        </div>

        <div className="my-3 flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="expirationDate" className="block">
              Expiration Date
            </label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className="p-2 border border-gray-300 w-full"
              required
            />
            {errors.expirationDate && <p className="text-red-500">{errors.expirationDate}</p>}
          </div>
          <div className="w-1/2">
            <label htmlFor="cvv" className="block">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className="p-2 border border-gray-300 w-full"
              required
            />
            {errors.cvv && <p className="text-red-500">{errors.cvv}</p>}
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
