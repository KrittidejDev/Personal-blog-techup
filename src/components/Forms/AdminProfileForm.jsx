import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputTextFeild from "../Inputs/InputTextFeild";
import InputFileUpload from "../Inputs/InputFileUpload";
import InputTextArea from "../Inputs/InputTextArea";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const AdminProfileForm = forwardRef(({ onSubmit, initialData = {} }, ref) => {
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
    bio: yup.string().max(300, "Bio must be at most 300 characters"),
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
      bio: "",
      ...initialData,
    },
  });

  const [_image, _setImage] = useState(initialData?.avatar || null);

  useEffect(() => {
    reset({
      name: initialData?.name || "",
      username: initialData?.username || "",
      email: initialData?.email || "",
      bio: initialData?.bio || "",
      avatar: initialData?.avatar?.url || "",
    });
    _setImage(initialData?.avatar?.url || null);
  }, [initialData, reset]);

  const _handleFileChange = (file) => {
    _setImage(file);
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      handleSubmit((formData) => {
        onSubmit({
          ...initialData,
          ...formData,
          avatar: typeof _image === "string" ? { url: _image } : _image,
        });
      })();
    },
  }));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-1 box-border "
    >
      {/* File Upload */}
      <div className="mb-10">
        <InputFileUpload
          label="Upload profile picture"
          onChange={_handleFileChange}
          initialPreview={_image}
        />
      </div>

      <div className="h-0.5 border-b border-brown-6d1/30 mb-10 w-[476px]" />

      {/* Name */}
      <div className="w-[476px] mb-7">
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
      <div className="w-[476px] mb-7">
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
      <div className="w-[476px] mb-7">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputTextFeild
              {...field}
              label="Email"
              placeholder="Email"
              errors={errors.email?.message}
            />
          )}
        />
      </div>

      {/* Bio */}
      <div className="mb-7 flex flex-1 max-w-[800px]  box-border">
        <Controller
          name="bio"
          control={control}
          render={({ field }) => (
            <InputTextArea
              {...field}
              label="Bio (max 300 letters)"
              errors={errors.bio?.message}
              className="w-full"
              maxLength={300}
              style={{ whiteSpace: "pre-wrap" }}
            />
          )}
        />
      </div>
    </form>
  );
});

export default AdminProfileForm;
