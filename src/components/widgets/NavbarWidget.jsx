import React from "react";
import { Button } from "../ui/button";
import Logo from "../Icons/Logo";
import Hamberger from "../Icons/Hamberger";

const NavbarWidget = () => {
  return (
    <div className="nav-bar-container">
      <div className="container  flex justify-between items-center">
        <a href="/">
          <Logo />
        </a>
        <div className="hidden md:flex gap-x-2.5">
          <Button className="btn-border-16b">Login</Button>{" "}
          <Button className={"btn-31e"}>Sign up</Button>
        </div>
        <div className="md:hidden flex">
          <Hamberger />
        </div>
      </div>
    </div>
  );
};

export default NavbarWidget;
