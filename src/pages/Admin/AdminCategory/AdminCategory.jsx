import AdminMainLayOut from "@/components/MainLayouts/AdminMainLayOut";
import React from "react";

const AdminCategory = () => {
  return (
    <AdminMainLayOut
      isAdd
      title={"Category management"}
      btnSaveLabel={"Create category"}
    >
      AdminCategory
    </AdminMainLayOut>
  );
};

export default AdminCategory;
