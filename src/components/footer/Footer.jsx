import React, { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../contexts/menu-context";
import "./footer.scss";

const Footer = () => {
  const { isDark } = useContext(MenuContext);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      if (
        document.documentElement.scrollTop >
        document.body.scrollHeight - 1400
      ) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  });

  return (
    <div
      className={`footer ${isScrolled ? "active" : ""}`}
      style={isDark ? { background: "#000", color: "#fff" } : {}}
    >
      <ul>
        <li>Tesla &copy; 2022</li>
        <li>Privacy & Legal</li>
        <li>Vehicle Recalls</li>
        <li>Contact</li>
        <li>Careers</li>
        <li>News</li>
        <li>Engage</li>
        <li>Locations</li>
      </ul>
    </div>
  );
};

export default Footer;
