import React, { useEffect, useState } from "react";
import Logo from "../Icons/Logo";
import { SignInWidget } from "./SignInWidget";
import { useAuth } from "@/context/AuthContext";
import { AvatarDisplay } from "../Displays/Avatar";
import { NotiDisplay } from "../Displays/NotiDisplay";
import Hamberger from "../Icons/Hamberger";
import { useNavigate } from "react-router-dom";
import UserIcon from "../Icons/UserIcon";
import ResetPasswordIcon from "../Icons/ResetPasswordIcon";
import SignOutIcon from "../Icons/SignOutIcon";
import { Button } from "../ui/button";
import BlankAvatar from "../Icons/BlankAvatar";

const NavbarWidget = () => {
  const { user, logout } = useAuth();
  const [_data, _setData] = useState({});
  const [_isOpen, _setIsOpen] = useState(false);
  const router = useNavigate();

  const _handleOpen = () => {
    _setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    _setData(user);
  }, [user]);

  const _handleClick = (page, e) => {
    e.stopPropagation();
    router(`${page}`);
    _setIsOpen(false);
  };

  const btnProfileStyle =
    "flex items-center gap-x-2.5 py-3 px-4 w-full text-brown-03b! cursor-pointer hover:shadow-lg hover:bg-brown-6d1 text-left text-b1 hover:scale-105 transition";

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
        <div className=" flex md:hidden" onClick={_handleOpen}>
          <Hamberger width="24" height="24" />
        </div>
        {_isOpen && (
          <div
            className={`md:hidden absolute flex flex-col flex-1 bg-brown-8f6 top-14 left-0 right-0  shadow-lg  mt-0.5 z-40`}
          >
            {!user ? (
              <SignInWidget
                onClose={() => {
                  _setIsOpen(false);
                }}
              />
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between  mb-4">
                  <div className="flex items-center gap-x-2">
                    {user?.avatar?.url ? (
                      <img
                        src={user?.avatar?.url}
                        alt="avatar"
                        className="w-12 h-12 object-cover object-center rounded-full overflow-hidden"
                      />
                    ) : (
                      <BlankAvatar width="48" height="48" />
                    )}
                    <div className="flex flex-1 line-clamp-1 text-b1 text-brown-03b!">
                      {user?.name}
                    </div>
                  </div>
                  <NotiDisplay />
                </div>
                <button
                  className={btnProfileStyle}
                  onClick={(e) => _handleClick("/me/profile", e)}
                >
                  <UserIcon />
                  Profile
                </button>
                <button
                  className={btnProfileStyle}
                  onClick={(e) => _handleClick("/me/reset-password", e)}
                >
                  <ResetPasswordIcon />
                  Reset password
                </button>
                <div className="h-[1px] border-b-[1px] my-4" />
                <button onClick={logout} className={btnProfileStyle}>
                  <SignOutIcon />
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarWidget;
