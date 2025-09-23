import React from "react";
import { IoClose } from "react-icons/io5";

const ModalEmpty = ({ children, isShowModal, onClose, isCloseBtn }) => {
  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ${
        !isShowModal && "hidden"
      }`}
      onClick={onClose}
    >
      <div className="relative z-[60] bg-brown-8f6 p-6 rounded-2xl">
        {isCloseBtn && (
          <div
            className="absolute top-5 right-5 cursor-pointer"
            onClick={onClose}
          >
            <IoClose className="text-brown-16b size-6" />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default ModalEmpty;
