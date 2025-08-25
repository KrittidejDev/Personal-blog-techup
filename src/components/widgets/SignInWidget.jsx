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

export const SignInWidget = () => {
  const router = useNavigate();

  const _handleClick = (page) => {
    router(`/${page}`);
  };

  return (
    <div>
      <div className="hidden md:flex gap-x-2.5">
        <Button
          className="btn-border-16b"
          onClick={() => _handleClick("login")}
        >
          Login
        </Button>{" "}
        <Button className={"btn-31e"} onClick={() => _handleClick("register")}>
          Sign up
        </Button>
      </div>
      <div className="md:hidden flex">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Hamberger />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={"border-none absolute right-[-35px] top-6  "}
          >
            <DropdownMenuItem>
              <Button
                className="btn-border-16b w-full"
                onClick={() => _handleClick("login")}
              >
                Login
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                className={"btn-31e w-full"}
                onClick={() => _handleClick("register")}
              >
                Sign up
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
