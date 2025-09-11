import { userService } from "@/apiServices";
import { BgLoading } from "@/components/Displays/BgLoading";
import ModalEmpty from "@/components/Displays/ModalEmpty";
import ResetPasswordForm from "@/components/Forms/ResetPasswordForm";
import AdminMainLayOut from "@/components/MainLayouts/AdminMainLayOut";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";

const AdminResetPassword = () => {
  const { user, logout } = useAuth();
  const formRef = useRef();
  const id = user._id;
  const [_isBgLoading, _setIsBgLoading] = useState(false);
  const [_renderModal, _setRenderModal] = useState(null);
  const [_data, _setData] = useState();

  const _handleSave = () => {
    formRef.current?.submit();
  };

  const _handleResetPassword = async (values) => {
    _setData(values);
    _setRenderModal(
      <div className="flex flex-col items-center pt-10 pb-5 w-[477px]">
        <div className="text-h3 text-brown-31e! mb-6">Reset password</div>
        <div className="text-b1 text-brown-16b mb-6">
          Do you want to reset your password?
        </div>
        <div className="flex justify-center items-center gap-x-2">
          <Button className={"btn-border-16b"} onClick={_handleCloseModal}>
            Cancel
          </Button>
          <Button className={"btn-31e"} onClick={_handleConfirm}>
            Reset
          </Button>
        </div>
      </div>
    );
  };

  const _handleConfirm = async () => {
    _setIsBgLoading(true);
    let param = {
      oldPassword: _data.password,
      newPassword: _data.new_password,
    };
    try {
      const res = await userService.RESET_PASSWORD(id, param);
      if (res.status === 200) {
        toast.success("Reset password completed");
        logout();
      }
    } catch (error) {
      toast.error("รหัสผ่านไม่ถูกต้อง", error.message);
      _setIsBgLoading(false);
    }
  };

  const _handleCloseModal = () => {
    _setRenderModal(null);
  };

  return (
    <AdminMainLayOut
      title={"Reset password"}
      btnSaveLabel={"Reset password"}
      onSave={_handleSave}
    >
      {_isBgLoading ? (
        <BgLoading />
      ) : (
        <ResetPasswordForm onSubmit={_handleResetPassword} ref={formRef} />
      )}
      <ModalEmpty
        isCloseBtn
        onClose={_handleCloseModal}
        isShowModal={_renderModal ? true : false}
      >
        {_renderModal}
      </ModalEmpty>
    </AdminMainLayOut>
  );
};

export default AdminResetPassword;
