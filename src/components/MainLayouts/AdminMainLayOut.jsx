import React from "react";
import SideBarWidget from "../widgets/SideBarWidget";
import { SidebarProvider } from "../ui/sidebar";
import AdminNavbarWidget from "../widgets/AdminNavbarWidget";

const AdminMainLayOut = ({
  children,
  title,
  btnSaveLabel,
  onSave,
  btnDraftLabel,
  onDraft,
  isAdd,
}) => {
  return (
    <SidebarProvider>
      <SideBarWidget />
      <main className="flex flex-1 flex-col">
        <AdminNavbarWidget
          title={title}
          isAdd={isAdd}
          btnSaveLabel={btnSaveLabel}
          onSave={onSave}
          btnDraftLabel={btnDraftLabel}
          onDraft={onDraft}
        />
        <div className="px-[60px] flex-1 py-10 bg-brown-8f6">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default AdminMainLayOut;
