import { userService } from "@/apiServices";
import SignInForm from "@/components/Forms/SignInForm";
import NavAndFooter from "@/components/MainLayouts/NavAndFooter";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useAuth();
  const [_isBgloading, _setIsBgLoading] = useState(false);

  const _handleSubmit = async (values) => {
    _setIsBgLoading(true);
    try {
      let res = await userService.POST_LOGIN(values);
      if (res && res.status === 200) {
        _setIsBgLoading(false);
        await login(res.token, res.refreshToken, res.user);
      } else {
        _setIsBgLoading(false);
        toast.error("เข้าสู่ระบบไม่สำเร็จ");
      }
    } catch (err) {
      _setIsBgLoading(false);
      console.error("Login error:", err);
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  return (
    <NavAndFooter>
      <div className="widget-container py-10 md:py-16! flex-1 ">
        <SignInForm onSubmit={_handleSubmit} />
      </div>
    </NavAndFooter>
  );
};

export default Login;
