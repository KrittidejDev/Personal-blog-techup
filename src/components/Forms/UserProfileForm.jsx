import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputTextFeild from "../Inputs/InputTextFeild";
import InputFileUpload from "../Inputs/InputFileUpload";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

const UserProfileForm = ({ onSubmit, initialData = {} }) => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      ...initialData,
    },
  });

  const [_image, _setImage] = useState(initialData?.avatar?.url || null);

  useEffect(() => {
    reset({
      name: initialData?.name || "",
      username: initialData?.username || "",
      email: initialData?.email || "",
      avatar: initialData?.avatar?.url || "",
    });
    _setImage(initialData?.avatar?.url || null);
  }, [initialData, reset]);

  const _handleFileChange = (file) => {
    _setImage(file);
  };

  const _handleSubmit = (formData) => {
    onSubmit({
      ...initialData,
      ...formData,
      avatar: typeof _image === "string" ? { url: _image } : _image,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(_handleSubmit)}
      className=" flex flex-col flex-1 w-full box-border justify-center md:justify-start md:p-10 md:rounded-2xl bg-brown-eeb P-4"
    >
      {/* File Upload */}
      <div className="mb-10">
        <InputFileUpload
          theme_user_profile
          label="Upload profile picture"
          onChange={_handleFileChange}
          initialPreview={_image}
        />
      </div>

      <div className="h-0.5 border-b border-brown-6d1/30 mb-10 w-[476px]" />
      <div className="px-6 pb-6">
        {/* Name */}
        <div className="max-w-[476px] mb-7">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputTextFeild
                {...field}
                label="Name"
                placeholder="Name"
                errors={errors.name?.message}
              />
            )}
          />
        </div>

        {/* Username */}
        <div className="max-w-[476px] mb-7">
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <InputTextFeild
                {...field}
                label="Username"
                placeholder="Username"
                errors={errors.username?.message}
              />
            )}
          />
        </div>

        {/* Email */}
        <div className="max-w-[476px] mb-7">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputTextFeild
                {...field}
                disabled
                label="Email"
                placeholder="Email"
                errors={errors.email?.message}
              />
            )}
          />
        </div>

        <div className="flex">
          <Button type="submit" className="btn-31e">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UserProfileForm;
