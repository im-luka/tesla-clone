import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";
import { MenuContext } from "../../contexts/menu-context";
import "./header.scss";
import CloseIcon from "@mui/icons-material/Close";

const navItems = [
  {
    name: "Model S",
    path: "/cars/models",
  },
  {
    name: "Model 3",
    path: "/cars/model3",
  },
  {
    name: "Model X",
    path: "/cars/modelx",
  },
  {
    name: "Model Y",
    path: "/cars/modely",
  },
  {
    name: "Solar Roof",
    path: "/solar/solarroof",
  },
  {
    name: "Solar Panels",
    path: "/solar/solarpanels",
  },
];

const Header = () => {
  const { isDark } = useContext(MenuContext);
  const headerRef = useRef();
  const isTablet = useMediaQuery("(max-width: 1215px)");

  const scrollTopHandler = () => {
    window.scrollTo({ left: 0, top: 0 });
  };

  useEffect(() => {
    const scrollHandler = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("scroll");
      } else {
        headerRef.current.classList.remove("scroll");
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  });

  return (
    <div
      ref={headerRef}
      className="header"
      style={isDark ? { color: "#fff" } : {}}
    >
      <div className="header__content">
        <div className="header__content__logo">
          <Link to="/" onClick={scrollTopHandler}>
            Tesla
          </Link>
        </div>

        {!isTablet && (
          <>
            <div className="header__content__menu">
              <Menu />
            </div>

            <div className="header__content__submenu">
              <Submenu />
            </div>
          </>
        )}
        {isTablet && <MobileNav />}
      </div>
    </div>
  );
};

const MobileNav = () => {
  const { isMenuShown, setIsMenuShown } = useContext(MenuContext);

  return (
    <div className={`header__content__mobnav ${isMenuShown ? "active" : ""}`}>
      {!isMenuShown && (
        <span className="menu" onClick={setIsMenuShown}>
          Menu
        </span>
      )}
      {isMenuShown && (
        <>
          <CloseIcon
            style={{ cursor: "pointer" }}
            fontSize="medium"
            onClick={setIsMenuShown}
          />

          <motion.div
            className="header__content__mobnav__nav"
            initial={{
              x: "100%",
            }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Menu />
            <Submenu />
          </motion.div>
        </>
      )}
    </div>
  );
};

const Menu = () => {
  return (
    <ul>
      {navItems.map((item, index) => (
        <li key={index}>
          <Link to={item.path}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};

const Submenu = () => {
  return (
    <ul>
      <li>
        <Link to="/shop">Shop</Link>
      </li>
      <li>
        <Link to="/auth">Account</Link>
      </li>
      <li>
        <Link to="/">Menu</Link>
      </li>
    </ul>
  );
};

export default Header;
