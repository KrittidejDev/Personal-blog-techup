import { userService } from "@/apiServices";
import { BgLoading } from "@/components/Displays/BgLoading";
import AdminProfileForm from "@/components/Forms/AdminProfileForm";
import AdminMainLayOut from "@/components/MainLayouts/AdminMainLayOut";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminProfile = () => {
  const formRef = useRef();

  const [_isBgLoading, _setIsBgLoading] = useState(true);
  const [_data, _setData] = useState();
  const [_dataUpdate, _setDataUpdate] = useState();

  useEffect(() => {
    _fetchMyProfile();
  }, []);

  const _fetchMyProfile = async () => {
    try {
      const res = await userService.GET_MY_PROFILE();
      if (res.status === 200) {
        _setData(res._doc);
        _setIsBgLoading(false);
      }
    } catch (error) {
      console.error(error);
      _setIsBgLoading(false);
    }
  };

  const _handleSave = () => {
    formRef.current?.submit();
  };

  const _handleSubmit = async (data) => {
    _setIsBgLoading(true);
    try {
      let avatarUrl = data.avatar;
      if (data.avatar instanceof File) {
        const formData = new FormData();
        formData.append("file", data.avatar);
        const uploadRes = await userService.POST_FILE_UPLOAD(formData);
        if (uploadRes.url) {
          avatarUrl = uploadRes.url;
        }
      }

      const profileRes = await userService.PUT_UPDATE_PROFILE(_data._id, {
        ...data,
        avatar: avatarUrl,
      });

      if (profileRes.status === 200) {
        toast.success("Profile updated successfully!");
        _setData(profileRes.user);
        localStorage.setItem("user", JSON.stringify(profileRes.user));
        _setIsBgLoading(false);
        _fetchMyProfile();
      }
    } catch (error) {
      console.error(error);
      toast.error("Update failed.");
      _setIsBgLoading(false);
    }
  };

  return (
    <AdminMainLayOut
      title={"Profile"}
      btnSaveLabel={"Save"}
      onSave={_handleSave}
    >
      {_isBgLoading ? (
        <BgLoading />
      ) : (
        <AdminProfileForm
          initialData={_data}
          ref={formRef}
          onSubmit={_handleSubmit}
        />
      )}
    </AdminMainLayOut>
  );
};

export default AdminProfile;
