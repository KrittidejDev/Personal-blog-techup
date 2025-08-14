import React from "react";
import { Icons } from "../Icons";
import { Button } from "../ui/button";

const NavbarWidget = () => {
  return (
    <div className="nav-bar-container">
      <div className="container  flex justify-between items-center">
        <a href="/">
          <Icons.Logo />
        </a>
        <div className="hidden md:flex gap-x-2.5">
          <Button className="btn-border-16b">Login</Button>{" "}
          <Button className={"btn-31e"}>Sign up</Button>
        </div>
        <div className="md:hidden flex">
          <Icons.Hamberger />
        </div>
      </div>
    </div>
  );
};

export default NavbarWidget;
