import React from "react";
import { Button } from "../ui/button";
import AddIcon from "../Icons/AddIcon";

const AdminNavbarWidget = ({
  title,
  btnSaveLabel,
  onSave,
  btnDraftLabel,
  onDraft,
  isAdd,
}) => {
  return (
    <div className="px-[60px] py-8 flex  border-b-2  border-b-#DAD6D1 w-full justify-between items-center bg-brown-8f6">
      <div className="text-h3 text-brown-31e! ">{title}</div>
      <div className="flex items-center gap-x-2">
        {btnDraftLabel && (
          <Button onClick={onDraft} className={"btn-border-16b"}>
            {btnDraftLabel}
          </Button>
        )}
        {btnSaveLabel && (
          <Button onClick={onSave} className={"btn-31e gap-x-1.5"}>
            {isAdd && (
              <span>
                <AddIcon />
              </span>
            )}{" "}
            {btnSaveLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdminNavbarWidget;
