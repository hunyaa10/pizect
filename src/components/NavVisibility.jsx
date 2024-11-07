import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNav } from "../context/NavContext";
import Nav from "./nav/Nav";

const NavVisibility = () => {
  const location = useLocation();
  const { isVisible, setIsVisible } = useNav();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/main") {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [location, setIsVisible]);

  if (!isVisible) {
    return null;
  }

  return <Nav />;
};

export default NavVisibility;
