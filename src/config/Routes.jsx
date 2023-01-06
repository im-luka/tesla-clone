import React from "react";
import { Route, Routes as Switch } from "react-router-dom";
import Home from "../pages/Home";
import Cars from "../pages/Cars";
import NotFound from "../pages/NotFound";
import Solar from "../pages/Solar";
import Auth from "../pages/Auth";
import Shop from "../pages/Shop";
import ShopMain from "../components/shop/ShopMain";
import ShopDetails from "../components/shop/ShopDetails";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/cars/:id" element={<Cars />} />
      <Route path="/solar/:id" element={<Solar />} />
      <Route path="/shop" element={<Shop />}>
        <Route path="" element={<ShopMain />} />
        <Route path="details" element={<ShopDetails />} />
      </Route>
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Switch>
  );
};

export default Routes;
