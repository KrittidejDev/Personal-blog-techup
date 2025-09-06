import React from "react";
import { Button } from "../ui/button";
import SuccessRegisterIcon from "../Icons/SuccessRegister";

const SignUpThankWidget = ({ onContinue }) => {
  return (
    <div className="bg-brown-eeb py-10 md:py-16 px-4 md:px-28 max-w-3xl w-full flex flex-col items-center gap-y-10 rounded-2xl">
      <SuccessRegisterIcon />
      <div className="text-2xl md:text-[40px] font-semibold text-brown-31e! text-center">
        Registration success
      </div>
      <Button className={"btn-31e"} onClick={onContinue}>
        Continue
      </Button>
    </div>
  );
};

export default SignUpThankWidget;
