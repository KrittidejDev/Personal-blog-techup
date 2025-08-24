import React from "react";
import NavbarWidget from "../Widgets/NavbarWidget";
import FooterWidget from "../Widgets/FooterWidget";

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
