import SignUpForm from "@/components/Forms/SignUpForm";
import NavAndFooter from "@/components/MainLayouts/NavAndFooter";
import SignUpThankWidget from "@/components/widgets/SignUpThankWidget";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const router = useNavigate();
  const [_step, _setStep] = useState(1);

  const _handleSubmit = () => {
    _setStep(2);
  };

  const _handleContinue = () => {
    router("/");
  };

  return (
    <NavAndFooter>
      <div className="widget-container py-10 md:py-16! flex-1">
        {_step === 1 && <SignUpForm onSubmit={_handleSubmit} />}
        {_step === 2 && <SignUpThankWidget onContinue={_handleContinue} />}
      </div>
    </NavAndFooter>
  );
};

export default Register;
