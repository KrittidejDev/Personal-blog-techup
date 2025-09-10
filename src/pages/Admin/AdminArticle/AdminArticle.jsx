import AddIcon from "@/components/Icons/AddIcon";
import AdminMainLayOut from "@/components/MainLayouts/AdminMainLayOut";
import AdminNavbarWidget from "@/components/widgets/AdminNavbarWidget";
import React from "react";

const AdminArticle = () => {
  return (
    <AdminMainLayOut
      isAdd
      title={"Article management"}
      btnSaveLabel={"Create article"}
    >
      AdminArticle
    </AdminMainLayOut>
  );
};

export default AdminArticle;
