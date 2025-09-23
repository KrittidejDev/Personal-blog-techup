import React, { useState, useEffect } from "react";
import cx from "classnames";
import AdminProfile from "../Icons/AdminProfile";
import Image from "../Icons/Image";

const InputFileUpload = ({
  initialPreview,
  onChange,
  disabled,
  label,
  require,
  isArticle,
  theme_user_profile,
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
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      if (onChange) onChange(file);
    }
  };

  const containerClass = cx(
    "flex justify-center md:justify-start flex-col pt-6 md:flex-row flex-wrap gap-y-6  gap-x-7 relative box-border ",
    isArticle ? "items-end" : "items-center"
  );

  const imageClass = cx("object-cover border shadow-md overflow-hidden", {
    "w-[480px] h-[260px] rounded-2xl": isArticle,
    "size-[120px] rounded-full": theme_user_profile,
    "size-[120px] rounded-full ": !isArticle && !theme_user_profile, // standard
  });

  const labelClass = cx(
    "cursor-pointer px-10 py-3 rounded-4xl bg-white font-medium text-brown-31e border border-brown-16b hover:bg-brown-16b hover:text-white transition",
    {
      "opacity-50 cursor-not-allowed": disabled,
      "text-b1 min-w-[100px]": theme_user_profile,
    }
  );

  return (
    <div className={containerClass}>
      <div>
        {isArticle && (
          <div className="text-b1 text-brown-16b! mb-4 ">Thumbnail image</div>
        )}

        {preview ? (
          <img src={preview} alt="preview" className={imageClass} />
        ) : (
          <div className={cx("flex items-center justify-center", imageClass)}>
            {isArticle ? (
              <Image width="60" height="60" />
            ) : (
              <AdminProfile width="60" height="60" />
            )}
          </div>
        )}
      </div>

      <input
        {...props}
        type="file"
        accept="image/*"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled}
      />

      <label htmlFor="file-upload" className={labelClass}>
        {label || "Upload Image"}
        {require && <span className="text-red">*</span>}
      </label>
    </div>
  );
};

export default InputFileUpload;
