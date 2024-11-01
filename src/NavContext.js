import React, { createContext, useContext, useState } from "react";

const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [isShowNav, setIsShowNav] = useState(true);

  const handleHideNav = () => setIsShowNav(false);
  const handleShowNav = () => setIsShowNav(true);

  return (
    <NavContext.Provider value={{ isShowNav, handleHideNav, handleShowNav }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => useContext(NavContext);
