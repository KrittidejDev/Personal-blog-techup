import React, { useEffect, useState } from "react";
import Logo from "../Icons/Logo";
import { SignInWidget } from "./SignInWidget";
import { useAuth } from "@/context/AuthContext";
import { AvatarDisplay } from "../Displays/Avatar";
import { NotiDisplay } from "../Displays/NotiDisplay";
import Hamberger from "../Icons/Hamberger";

const NavbarWidget = () => {
  const { user, logout } = useAuth();
  const [_data, _setData] = useState({});

  useEffect(() => {
    _setData(user);
  }, [user]);

  return (
    <div className="nav-bar-container">
      <div className="container  flex justify-between items-center">
        <a href="/">
          <span className="hidden md:flex">
            <Logo width="44" height="44" />
          </span>
          <span className="flex md:hidden">
            <Logo width="24" height="24" />
          </span>
        </a>
        <div className="hidden md:flex">
          {_data ? (
            <div className="flex items-center gap-x-4">
              <NotiDisplay />
              <AvatarDisplay data={_data} onLogOut={logout} />
            </div>
          ) : (
            <SignInWidget />
          )}
        </div>
        <div className=" flex md:hidden">
          <Hamberger width="24" height="24" />
        </div>
      </div>
    </div>
  );
};

export default NavbarWidget;
