import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IoIosArrowDown } from "react-icons/io";
import UserIcon from "../Icons/UserIcon";
import ResetPasswordIcon from "../Icons/ResetPasswordIcon";
import SignOutIcon from "../Icons/SignOutIcon";

export const AvatarDisplay = ({ data, className, onLogOut }) => {
  const [_isOpen, _setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const btnProfileStyle =
    "flex items-center gap-x-2.5 py-3 px-4 w-full cursor-pointer hover:shadow-lg hover:bg-brown-6d1 text-left text-b1 hover:scale-105 transition";

  return (
    <div className={`${className} relative`} ref={dropdownRef}>
      <div className="flex items-center gap-x-2.5 " onClick={_handleOpen}>
        <Avatar className={"w-12 h-12"}>
          <AvatarImage
            src={
              data?.avatar || `https://i.pravatar.cc/150?u=${data?.username}`
            }
          />
        </Avatar>
        <div className="flex flex-nowrap items-center gap-x-1.5 text-b1">
          {data?.name} <IoIosArrowDown className="size-4 text-brown-16b" />
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
          <button className={btnProfileStyle}>
            <UserIcon />
            Profile
          </button>
          <button className={btnProfileStyle}>
            <ResetPasswordIcon />
            Reset password
          </button>
          <button onClick={onLogOut} className={btnProfileStyle}>
            <SignOutIcon />
            Log out
          </button>
        </div>
      )}
    </div>
  );
};
