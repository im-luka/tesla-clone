import React from "react";
import { Routes, Route } from "react-router-dom";
import ShopDetails from "../components/shop/ShopDetails";
import ShopMain from "../components/shop/ShopMain";

const Shop = () => {
  return (
    <Routes>
      <Route path="" element={<ShopMain />} />
      <Route path="details" element={<ShopDetails />} />
    </Routes>
  );
};

export default Shop;
