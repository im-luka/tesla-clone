import React, { useState } from "react";

export const MenuContext = React.createContext({
  isMenuShown: false,
  setIsMenuShown: () => {},
  isDark: false,
  setIsDark: (value) => {},
});

export const MenuContextProvider = ({ children }) => {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const menuHandler = () => {
    setIsMenuShown((prevstate) => !prevstate);
  };

  const darkHandler = (value) => {
    setIsDark(value);
  };

  return (
    <MenuContext.Provider
      value={{
        isMenuShown,
        setIsMenuShown: menuHandler,
        isDark,
        setIsDark: darkHandler,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
