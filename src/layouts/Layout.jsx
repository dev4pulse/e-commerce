// src/layouts/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Layout() {
  return (
    <>
      {/* Fixed or sticky navbar */}
      <Navbar />
      {/* Push content below navbar height if using fixed-top */}
      <main className="pt-nav">
        <Outlet />
      </main>
    </>
  );
}
