import React from "react";
import { BrowserRouter } from "react-router-dom";
import { MenuContextProvider } from "./contexts/menu-context";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Routes from "./config/Routes";
import { ModelContextProvider } from "./contexts/model-context";

const App = () => {
  return (
    <BrowserRouter>
      <MenuContextProvider>
        <ModelContextProvider>
          <Header />
          <Routes />
          <Footer />
        </ModelContextProvider>
      </MenuContextProvider>
    </BrowserRouter>
  );
};

export default App;
