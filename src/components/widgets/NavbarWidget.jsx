import React, { useEffect, useState } from "react";
import Logo from "../Icons/Logo";
import { SignInWidget } from "./SignInWidget";
import { useAuth } from "@/context/AuthContext";
import { AvatarDisplay } from "../Displays/Avatar";
import { NotiDisplay } from "../Displays/NotiDisplay";

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
          <Logo />
        </a>
        {_data ? (
          <div className="flex items-center gap-x-4">
            <NotiDisplay />
            <AvatarDisplay data={_data} onLogOut={logout} />
          </div>
        ) : (
          <SignInWidget />
        )}
      </div>
    </div>
  );
};

export default NavbarWidget;
