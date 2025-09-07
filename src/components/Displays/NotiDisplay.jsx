import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import UserIcon from "../Icons/UserIcon";
import ResetPasswordIcon from "../Icons/ResetPasswordIcon";
import SignOutIcon from "../Icons/SignOutIcon";
import BellIcon from "../Icons/BellIcon";

export const NotiDisplay = ({ notiData = true, className, onLogOut }) => {
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
        <div className="h-12 w-12 rounded-full border border-brown-eeb flex items-center justify-center">
          <BellIcon />
        </div>
        {notiData && (
          <div className="absolute h-2 w-2 rounded-full bg-red top-1 right-1" />
        )}
      </div>
      {_isOpen && notiData && (
        <div
          className={`absolute flex flex-col w-62 bg-brown-8f6 top-14 right-0 rounded-lg shadow-lg  overflow-hidden `}
          onMouseLeave={() => {
            setTimeout(() => _setIsOpen(false), 1000);
          }}
          onMouseEnter={() => clearTimeout()}
        >
          {notiData.map((e) => (
            <div>item</div>
          ))}
        </div>
      )}
    </div>
  );
};
