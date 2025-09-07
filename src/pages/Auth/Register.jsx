import { userService } from "@/apiServices";
import { BgLoading } from "@/components/Displays/BgLoading";
import SignUpForm from "@/components/Forms/SignUpForm";
import NavAndFooter from "@/components/MainLayouts/NavAndFooter";
import SignUpThankWidget from "@/components/widgets/SignUpThankWidget";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const { login } = useAuth();
  const [_step, _setStep] = useState(1);
  const [_data, _setData] = useState();
  const [_isBgloading, _setIsBgLoading] = useState(false);

  const _handleSubmit = async (values) => {
    _setIsBgLoading(true);
    const body = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
    };
    try {
      let res = await userService.POST_SIGNUP(body);
      if (res.status === 200) {
        localStorage.setItem("token", res.token);
        _setData(res);
        _setStep(2);
        _setIsBgLoading(false);
        toast.success("ลงทะเบียนสำเร็จ");
      } else {
        toast.error(res.data.message);
        _setIsBgLoading(false);
      }
    } catch (error) {
      _setIsBgLoading(false);
      toast.error("ลงทะเบียนไม่สำเร็จ");
    }
  };

  const _handleContinue = async () => {
    _setIsBgLoading(true);
    await login(_data.token, _data.refreshToken, _data.user);
  };

  return (
    <NavAndFooter>
      {_isBgloading ? (
        <BgLoading />
      ) : (
        <div className="widget-container py-10 md:py-16! flex-1">
          {_step === 1 && <SignUpForm onSubmit={_handleSubmit} />}
          {_step === 2 && <SignUpThankWidget onContinue={_handleContinue} />}
        </div>
      )}
    </NavAndFooter>
  );
};

export default Register;
