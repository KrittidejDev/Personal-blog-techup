import React from "react";
import Hamberger from "../Icons/Hamberger";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export const SignInWidget = ({ onClose }) => {
  const router = useNavigate();

  const _handleClick = (page) => {
    router(`${page}`);
    onClose?.();
  };

  return (
    <div>
      <div className="py-10 px-6 gap-y-6 flex flex-col md:p-0 md:flex-row gap-x-2.5">
        <Button
          className="btn-border-16b"
          onClick={() => _handleClick("/login")}
        >
          Login
        </Button>
        <Button className={"btn-31e"} onClick={() => _handleClick("/register")}>
          Sign up
        </Button>
      </div>
    </div>
  );
};
