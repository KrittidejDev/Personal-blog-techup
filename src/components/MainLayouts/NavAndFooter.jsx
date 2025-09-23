import React from "react";
import NavbarWidget from "../widgets/NavbarWidget";
import FooterWidget from "../widgets/FooterWidget";

const NavAndFooter = ({ children, isAuth }) => {
  return (
    <div className="nav-and-footer-container box-border ">
      <NavbarWidget />
      {children}
      {!isAuth && <FooterWidget />}
    </div>
  );
};

export default NavAndFooter;
