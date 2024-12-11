import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Import useLocation
import Header from './header';
import CartTab from './cartTab';
import { useSelector } from 'react-redux';

const Layout = () => {
  const location = useLocation(); // Get the current route
  const statusTabCart = useSelector((store) => store.cart.statusTab);

  const showCartTab = location.pathname !== '/checkout'; // Hide CartTab on the Checkout page

  return (
    <div className="bg-zinc-200">
      <main
        className={`w-[1200px] max-w-full m-auto p-5 transform transition-transform duration-500
        ${statusTabCart === false ? '' : '-translate-x-56'}`}
      >
        <Header />
        <Outlet />
      </main>
      {showCartTab && <CartTab />} {/* Conditionally render CartTab */}
    </div>
  );
};

export default Layout;
