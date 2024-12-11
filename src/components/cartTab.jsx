import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { toggleStatusTab } from '../stores/cart';

const CartTab = () => {
  const carts = useSelector((store) => store.cart.items);
  const statusTab = useSelector((store) => store.cart.statusTab);
  const dispatch = useDispatch();
  // Calculate subtotal
  const subtotal = carts.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };
  return (
    <div
      className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] transform transition-transform duration-500 ${statusTab === false ? 'translate-x-full' : ''
        } `}
    >
      <h2 className="p-5 text-white text-2xl"> Shopping Cart</h2>
      <div className="p-5">
        {carts.map((item, key) => (
          <CartItem key={key} data={item} />
        ))}
      </div>

      {/* Subtotal Section */}
      <div className="p-5 text-white">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span> {/* Display subtotal with 2 decimal places */}
        </div>
      </div>

      <div className="grid grid-cols-2">
        <button className="bg-black text-white" onClick={handleCloseTabCart}>
          CLOSE
        </button>
        {/* Pass the full cartItems via state to Checkout */}
        <Link to="/checkout" state={{ cartItems: carts }}>
          <button className="bg-amber-600 text-white">CHECKOUT</button>
        </Link>
      </div>
    </div>
  );
};

export default CartTab;
