import React from "react";
import AdminProfile from "../Icons/AdminProfile";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ResetPasswordIcon from "../Icons/ResetPasswordIcon";

const ProfileSideMenu = () => {
  const location = useLocation();
  const router = useNavigate();
  const active = location.pathname.split("/").pop();

  return (
    <div className=" w-[196px] flex md:flex-col">
      <div
        className="flex item-center gap-x-3 px-4 py-3 hover:bg-brown-6d1/30 cursor-pointer"
        onClick={() => router("/me/profile")}
      >
        <AdminProfile
          width="24"
          height="24"
          color={active === "profile" ? "#75716B" : "#DAD6D1"}
        />
        <div
          className={`text-b1 ${
            active === "profile" ? "text-brown-03b!" : "text-brown-16b!"
          }`}
        >
          Profile
        </div>
      </div>
      <div
        className="flex item-center gap-x-3 px-4 py-3 hover:bg-brown-6d1/30 cursor-pointer "
        onClick={() => router("/me/reset-password")}
      >
        <ResetPasswordIcon
          width="24"
          height="24"
          color={active === "reset-password" ? "#75716B" : "#DAD6D1"}
        />
        <div
          className={`text-b1 whitespace-nowrap ${
            active === "reset-password" ? "text-brown-03b!" : "text-brown-16b!"
          }`}
        >
          Reset password{" "}
        </div>
      </div>
    </div>
  );
};

export default ProfileSideMenu;
