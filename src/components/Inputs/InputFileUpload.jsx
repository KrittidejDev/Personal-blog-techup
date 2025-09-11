import React, { useState } from "react";
import cx from "classnames";
import AdminProfile from "../Icons/AdminProfile";
import { useEffect } from "react";

const InputFileUpload = ({
  initialPreview,
  onChange,
  disabled,
  label,
  require,
  ...props
}) => {
  const [preview, setPreview] = useState(initialPreview);

  useEffect(() => {
    setPreview(initialPreview);
  }, [initialPreview]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      if (onChange) onChange(file);
    }
  };

  return (
    <div className="flex  items-center gap-x-7 relative">
      {preview ? (
        <img
          src={preview}
          alt="preview"
          className="size-[120px] object-cover rounded-full border shadow-md"
        />
      ) : (
        <div className="size-[120px] rounded-full bg-brown-6d1 flex justify-center items-center">
          <AdminProfile width="60" height="60" />
        </div>
      )}

      <input
        {...props}
        type="file"
        accept="image/*"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled}
      />

      <label
        htmlFor="file-upload"
        className={cx(
          "cursor-pointer px-10 py-3 rounded-4xl bg-white font-medium text-brown-31e border border-brown-16b hover:bg-brown-16b hover:text-white transition",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {label || "Upload Image"}{" "}
        {require && <span className="text-red">*</span>}
      </label>
    </div>
  );
};

export default InputFileUpload;
