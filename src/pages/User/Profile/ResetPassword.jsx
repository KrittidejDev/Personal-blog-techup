import { userService } from "@/apiServices";
import { BgLoading } from "@/components/Displays/BgLoading";
import ModalEmpty from "@/components/Displays/ModalEmpty";
import ProfileHeaderTab from "@/components/Displays/ProfileHeaderTab";
import ProfileSideMenu from "@/components/Displays/ProfileSideMenu";
import UserResetPasswordForm from "@/components/Forms/UserResetPasswordForm";
import NavAndFooter from "@/components/MainLayouts/NavAndFooter";
import { Button } from "@/components/ui/button";
import NavbarWidget from "@/components/widgets/NavbarWidget";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { user, logout } = useAuth();
  const id = user._id;
  const [_renderModal, _setRenderModal] = useState(null);
  const [_data, _setData] = useState();
  const [_dataValue, _setDataValue] = useState();
  const [_isBgLoading, _setIsBgLoading] = useState(true);

  const _fetchMe = async () => {
    try {
      const res = await userService.GET_MY_PROFILE();
      if (res.status === 200) {
        _setData(res);
      }
    } catch (error) {
      console.error(error);
    } finally {
      _setIsBgLoading(false);
    }
  };

  useEffect(() => {
    _fetchMe();
  }, [id]);

  const _handleResetPassword = async (values) => {
    _setDataValue(values);
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
    try {
      let param = {
        oldPassword: _dataValue.password,
        newPassword: _dataValue.new_password,
      };
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
    <div className="w-full box-border overflow-hidden ">
      <NavbarWidget />
      <div className="flex flex-1 justify-center">
        <div className="container max-w-[794px]! md:pt-[52px] ">
          {_isBgLoading ? (
            <BgLoading />
          ) : (
            <>
              <div className="h-[48px] md:hidden ">
                <ProfileSideMenu />
              </div>
              <ProfileHeaderTab data={_data} page={"Reset password"} />
              <div className="flex gap-x-12">
                <div className="hidden md:flex">
                  <ProfileSideMenu />
                </div>
                <div className="text-h1 box-border w-full">
                  <UserResetPasswordForm onSubmit={_handleResetPassword} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <ModalEmpty
        isCloseBtn
        onClose={_handleCloseModal}
        isShowModal={_renderModal ? true : false}
      >
        {_renderModal}
      </ModalEmpty>
    </div>
  );
};

export default ResetPassword;
