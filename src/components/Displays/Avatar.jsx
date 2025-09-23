import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import UserIcon from "../Icons/UserIcon";
import ResetPasswordIcon from "../Icons/ResetPasswordIcon";
import SignOutIcon from "../Icons/SignOutIcon";
import { useNavigate } from "react-router-dom";
import AdminBook from "../Icons/AdminBook";
import BlankAvatar from "../Icons/BlankAvatar";

export const AvatarDisplay = ({ data, className, onLogOut }) => {
  const [_isOpen, _setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        _setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const _handleOpen = () => {
    _setIsOpen((prev) => !prev);
  };

  const _handleClickAdmin = () => {
    router("/admin/article");
  };

  const btnProfileStyle =
    "flex items-center gap-x-2.5 py-3 px-4 w-full text-brown-03b! cursor-pointer hover:shadow-lg hover:bg-brown-6d1 text-left text-b1 hover:scale-105 transition";

  return (
    <div className={`${className} relative`} ref={dropdownRef}>
      <div className="flex items-center gap-x-2.5 " onClick={_handleOpen}>
        {data?.avatar?.url ? (
          <img
            src={data?.avatar?.url}
            alt="avatar"
            className="w-12 h-12 object-cover object-center rounded-full overflow-hidden"
          />
        ) : (
          <BlankAvatar width="48" height="48" />
        )}
        <div className="flex flex-nowrap items-center gap-x-1.5 text-b1 text-brown-03b!">
          <span className=" max-w-[10ch] overflow-hidden whitespace-nowrap text-ellipsis">
            {data?.name}
          </span>
          <IoIosArrowDown className="size-4 text-brown-16b" />
        </div>
      </div>
      {_isOpen && (
        <div
          className={`absolute flex flex-col w-62 bg-brown-8f6 top-18 right-0 rounded-lg shadow-lg  overflow-hidden `}
          onMouseLeave={() => {
            setTimeout(() => _setIsOpen(false), 1000);
          }}
          onMouseEnter={() => clearTimeout()}
        >
          {data?.role === "admin" ? (
            <button className={btnProfileStyle} onClick={_handleClickAdmin}>
              <AdminBook />
              Dashboard
            </button>
          ) : (
            <>
              <button
                className={btnProfileStyle}
                onClick={() => {
                  router("/me/profile");
                  _setIsOpen(false);
                }}
              >
                <UserIcon />
                Profile
              </button>
              <button
                className={btnProfileStyle}
                onClick={() => {
                  router("/me/reset-password");
                  _setIsOpen(false);
                }}
              >
                <ResetPasswordIcon />
                Reset password
              </button>
            </>
          )}
          <button onClick={onLogOut} className={btnProfileStyle}>
            <SignOutIcon />
            Log out
          </button>
        </div>
      )}
    </div>
  );
};
