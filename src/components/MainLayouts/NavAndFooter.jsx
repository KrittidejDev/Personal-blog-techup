import React from "react";
import { NavbarWidget } from "../widgets";

const NavAndFooter = ({ children }) => {
  return (
    <div className="nav-and-footer-container">
      <NavbarWidget />
      {children}
    </div>
  );
};

export default NavAndFooter;
