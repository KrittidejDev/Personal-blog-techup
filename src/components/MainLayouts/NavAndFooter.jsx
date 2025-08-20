import React from "react";
import { FooterWidget, NavbarWidget } from "../widgets";

const NavAndFooter = ({ children }) => {
  return (
    <div className="nav-and-footer-container box-border ">
      <NavbarWidget />
      {children}
      <FooterWidget />
    </div>
  );
};

export default NavAndFooter;
