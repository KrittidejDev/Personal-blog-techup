import { userService } from "@/apiServices";
import { BgLoading } from "@/components/Displays/BgLoading";
import AdminCategoryDetailForm from "@/components/Forms/AdminCategoryDetailForm";
import AdminMainLayOut from "@/components/MainLayouts/AdminMainLayOut";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AdminCategoryDetail = () => {
  const formRef = useRef();
  const { id } = useParams();
  const router = useNavigate();
  const [_isBgLoading, _setIsBgLoading] = useState(true);
  const [_data, _setData] = useState(null);

  useEffect(() => {
    _fetchCategory(id);
  }, [id]);

  const _fetchCategory = async (id) => {
    try {
      if (id !== "create") {
        let res = await userService.GET_CATEGORY_BY_ID(id);
        if (res.status === 200) {
          _setData(res.data[0]);
        }
        _setIsBgLoading(false);
      } else {
        _setIsBgLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const _handleSave = () => {
    formRef.current?.submit();
    _setIsBgLoading(true);
  };

  const _handleSubmit = async (data) => {
    try {
      let params = {
        name: data?.name,
      };
      if (id === "create") {
        const res = await userService.POST_CREATE_CATEGORY(params);
        if (res.status === 201) {
          toast.success("Create category success");
          router("/admin/category");
        } else {
          toast.error("ไม่สำเร็จ กรุณาตรวจสอบ category name");
          _setIsBgLoading(false);
        }
      } else {
        const res = await userService.PUT_EDIT_CATEGORY(id, params);
        if (res.status === 200) {
          toast.success("Update category success");
          router("/admin/category");
        }
      }
    } catch (error) {
      toast.error("Update category fail");
      console.error(error);
      _setIsBgLoading(false);
    }
  };

  return (
    <AdminMainLayOut
      title={"Category management"}
      btnSaveLabel={"Save"}
      onSave={_handleSave}
    >
      {_isBgLoading ? (
        <BgLoading />
      ) : (
        <AdminCategoryDetailForm
          onSubmit={_handleSubmit}
          initialData={_data}
          ref={formRef}
        />
      )}
    </AdminMainLayOut>
  );
};

export default AdminCategoryDetail;
