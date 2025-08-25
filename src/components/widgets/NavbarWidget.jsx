import React from "react";
import Logo from "../Icons/Logo";
import { SignInWidget } from "./SignInWidget";

const NavbarWidget = () => {
  return (
    <div className="nav-bar-container">
      <div className="container  flex justify-between items-center">
        <a href="/">
          <Logo />
        </a>
        <SignInWidget />
      </div>
    </div>
  );
};

export default NavbarWidget;
