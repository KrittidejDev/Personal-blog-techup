import SignInForm from "@/components/Forms/SignInForm";
import NavAndFooter from "@/components/MainLayouts/NavAndFooter";
import React from "react";

const Login = () => {
  return (
    <NavAndFooter>
      <div className="widget-container py-10 md:py-16! flex-1 ">
        <SignInForm />
      </div>
    </NavAndFooter>
  );
};

export default Login;
