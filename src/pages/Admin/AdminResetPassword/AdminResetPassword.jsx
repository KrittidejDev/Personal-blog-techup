import { userService } from "@/apiServices";
import ResetPasswordForm from "@/components/Forms/ResetPasswordForm";
import AdminMainLayOut from "@/components/MainLayouts/AdminMainLayOut";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { useRef } from "react";
import { toast } from "react-toastify";

const AdminResetPassword = () => {
  const { user, logout } = useAuth();
  const formRef = useRef();
  const id = user._id;

  const _handleSave = () => {
    formRef.current?.submit();
  };

  const _handleResetPassword = async (values) => {
    try {
      const res = await userService.RESET_PASSWORD(id, {
        oldPassword: values.password,
        newPassword: values.new_password,
      });
      if (res.status === 200) {
        toast.success("Reset password completed");
        logout();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminMainLayOut
      title={"Reset password"}
      btnSaveLabel={"Reset password"}
      onSave={_handleSave}
    >
      <ResetPasswordForm onSubmit={_handleResetPassword} ref={formRef} />
    </AdminMainLayOut>
  );
};

export default AdminResetPassword;
