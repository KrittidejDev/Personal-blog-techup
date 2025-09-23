import { userService } from "@/apiServices";
import { BgLoading } from "@/components/Displays/BgLoading";
import ProfileHeaderTab from "@/components/Displays/ProfileHeaderTab";
import ProfileSideMenu from "@/components/Displays/ProfileSideMenu";
import UserProfileForm from "@/components/Forms/UserProfileForm";
import NavAndFooter from "@/components/MainLayouts/NavAndFooter";
import NavbarWidget from "@/components/widgets/NavbarWidget";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const ProfileSetting = () => {
  const [_data, _setData] = useState();
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
  }, []);

  const _handleSubmit = async (data) => {
    _setIsBgLoading(true);
    try {
      let avatarObj = data.avatar;

      if (data.avatar instanceof File) {
        if (_data?.avatar?.public_id) {
          await userService.DELETE_FILE({ public_id: _data.avatar.public_id });
        }
        const formData = new FormData();
        formData.append("file", data.avatar);
        const uploadRes = await userService.POST_FILE_UPLOAD(formData);
        if (uploadRes.url && uploadRes.public_id) {
          avatarObj = {
            url: uploadRes.url,
            public_id: uploadRes.public_id,
          };
        }
      }

      const profileRes = await userService.PUT_UPDATE_PROFILE(_data._id, {
        ...data,
        avatar: avatarObj,
      });

      if (profileRes.status === 200) {
        toast.success("Profile updated successfully!");
        _setData(profileRes.user);
        localStorage.setItem("user", JSON.stringify(profileRes.user));
        _fetchMe();
      }
    } catch (error) {
      console.error(error);
      toast.error("Update failed.");
    } finally {
      _setIsBgLoading(false);
    }
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
              <ProfileHeaderTab data={_data} page={"Profile"} />
              <div className="flex gap-x-12">
                <div className="hidden md:flex">
                  <ProfileSideMenu />
                </div>
                <div className="text-h1 box-border w-full">
                  <UserProfileForm
                    initialData={_data}
                    onSubmit={_handleSubmit}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
