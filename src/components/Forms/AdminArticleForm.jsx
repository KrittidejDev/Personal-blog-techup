import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputTextFeild from "../Inputs/InputTextFeild";
import InputFileUpload from "../Inputs/InputFileUpload";
import InputTextArea from "../Inputs/InputTextArea";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { InputDropdown } from "../Inputs/InputDropdown";
import TrashDelete from "../Icons/TrashDelete";

const AdminArticleForm = forwardRef(
  ({ onSubmit, initialData = {}, categoryData, authorData, onDelete }, ref) => {
    const schema = yup.object().shape({
      category: yup.string().required("Category is required"),
      title: yup.string().required("Title is required"),
      author: yup.string().required("Author is required"),
      subtitle: yup
        .string()
        .max(120, "Introduction must be at most 120 characters")
        .required("Introduction is required"),
      content: yup.string().required("Content is required"),
    });

    const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        category: "",
        author: "",
        title: "",
        subtitle: "",
        content: "",
        ...initialData,
      },
    });

    const [_image, _setImage] = useState(initialData?.image);

    useEffect(() => {
      reset({
        category: initialData?.category?._id || "",
        author_name: initialData?.author?.name
          ? initialData?.author?.name
          : authorData?.name,
        author: initialData?.author?._id
          ? initialData?.author?._id
          : authorData?._id,
        title: initialData?.title || "",
        subtitle: initialData?.subtitle || "",
        content: initialData?.content || "",
        image: initialData?.image || "",
      });
      _setImage(initialData?.image || null);
    }, [initialData, reset]);

    useEffect(() => {
      if (initialData?.image) {
        _setImage(initialData.image);
      }
    }, [initialData?.image]);

    const _handleFileChange = (file) => {
      _setImage(file);
    };

    useImperativeHandle(ref, () => ({
      submit: (statusFromButton) => {
        handleSubmit((formData) => {
          onSubmit({
            ...initialData,
            ...formData,
            image: _image,
            status: statusFromButton,
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
            isArticle
            label="Upload profile picture"
            onChange={_handleFileChange}
            initialPreview={_image}
          />
        </div>
        <div className="h-0.5 border-b border-brown-6d1/30 mb-10 w-[476px]" />
        {/* Name */}
        <div className="w-[476px] mb-7">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <InputDropdown
                {...field}
                isAdmin
                placeholder={"Category"}
                options={
                  categoryData?.map((e) => ({
                    value: e._id,
                    label: e.name,
                  })) || []
                }
                errors={errors.category?.message}
              />
            )}
          />
        </div>
        {/* auther name */}
        <div className="w-[476px] mb-7">
          <Controller
            name="author_name"
            control={control}
            render={({ field }) => (
              <InputTextFeild
                {...field}
                label="Author name"
                errors={errors.author_name?.message}
                disabled
              />
            )}
          />
        </div>
        {/* title */}
        <div className="w-[476px] mb-7">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <InputTextFeild
                {...field}
                label="Title"
                placeholder="Title"
                errors={errors.title?.message}
              />
            )}
          />
        </div>
        {/* intro */}
        <div className="w-[60lvw] mb-7">
          <Controller
            name="subtitle"
            control={control}
            render={({ field }) => (
              <InputTextArea
                {...field}
                label="Introduction (max 120 letters)"
                errors={errors.subtitle?.message}
                maxLength={120}
              />
            )}
          />
        </div>
        {/* content */}
        <div className="w-[60lvw]  mb-7">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <InputTextArea
                {...field}
                height="577px"
                label="Content"
                errors={errors.content?.message}
                className="max-h-[572px] "
              />
            )}
          />
        </div>

        {initialData && (
          <div
            className="flex items-center gap-x-1.5 text-b1 text-brown-31e!"
            onClick={onDelete}
          >
            <TrashDelete width="24" height="24" /> Delete article
          </div>
        )}
      </form>
    );
  }
);

export default AdminArticleForm;
