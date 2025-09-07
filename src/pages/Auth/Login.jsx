import SignInForm from "@/components/Forms/SignInForm";
import NavAndFooter from "@/components/MainLayouts/NavAndFooter";
import { useAuth } from "@/context/AuthContext";
import React from "react";

const Login = () => {
  const { login } = useAuth();
  const [_isBgloading, _setIsBgLoading] = useState(false);

  const _handleSubmit = async (values) => {
    _setIsBgLoading(true);
    let params = {
      ...values,
    };
    let res = await userService.POST_LOGIN(params);
    console.log("res login", res);
    if (res && res.status === 200) {
      _setIsBgLoading(false);
      localStorage.setItem("token", res.data.token);
      await login(res.data.token, res.data.refreshToken);
      toast.success("เข้าสู่ระบบสำเร็จ");
      router.push("/");
    } else {
      _setIsBgLoading(false);
      toast.error("เข้าสู่ระบบไม่สำเร็จ");
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
