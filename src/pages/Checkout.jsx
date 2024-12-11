import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { products } from '../products';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { cartItems } = location.state || {};

  const [cartDetails, setCartDetails] = useState([]);
  const [errors, setErrors] = useState({});

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

  const validateCardNumber = (number) => /^[0-9]{16}$/.test(number);
  const validateExpirationDate = (date) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(date); // Format: MM/YY
  const validateCVV = (cvv) => /^[0-9]{3}$/.test(cvv);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      isValid = false;
      newErrors.name = 'Name is required.';
    }
    if (!formData.address.trim()) {
      isValid = false;
      newErrors.address = 'Address is required.';
    }
    if (!validateCardNumber(formData.cardNumber)) {
      isValid = false;
      newErrors.cardNumber = 'Card number must be 16 digits.';
    }
    if (!validateExpirationDate(formData.expirationDate)) {
      isValid = false;
      newErrors.expirationDate = 'Expiration date must be in MM/YY format.';
    }
    if (!validateCVV(formData.cvv)) {
      isValid = false;
      newErrors.cvv = 'CVV must be 3 digits.';
    }

    setErrors(newErrors);

    if (isValid) {
      console.log('Form submitted with:', formData);
      // Navigate to confirmation page
      navigate('/order-confirmation');
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl">Checkout</h2>
      {/* Cart Items and Form Logic as before */}
      {/* Add your form code here */}
      <form onSubmit={handleSubmit}>
        {/* Add input fields and error handling */}
        <button type="submit" className="bg-amber-600 text-white py-2 px-4 mt-4">
          Complete Purchase
        </button>
      </form>
    </div>
  );
};

export default Checkout;
