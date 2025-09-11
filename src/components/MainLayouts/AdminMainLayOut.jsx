import React from "react";
import SideBarWidget from "../widgets/SideBarWidget";
import { SidebarProvider } from "../ui/sidebar";
import AdminNavbarWidget from "../widgets/AdminNavbarWidget";
import { useState } from "react";

const AdminMainLayOut = ({
  children,
  title,
  btnSaveLabel,
  onSave,
  btnDraftLabel,
  onDraft,
  isAdd,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarProvider className={"flex"}>
      <SideBarWidget collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className={`flex-1 flex flex-col transition-all duration-300`}
        style={{ marginLeft: collapsed ? "70px" : "280px" }}
      >
        <AdminNavbarWidget
          title={title}
          isAdd={isAdd}
          btnSaveLabel={btnSaveLabel}
          onSave={onSave}
          btnDraftLabel={btnDraftLabel}
          onDraft={onDraft}
        />
        <div className="px-[60px] flex flex-col flex-1 overflow-y-auto py-10 bg-brown-8f6">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default AdminMainLayOut;
