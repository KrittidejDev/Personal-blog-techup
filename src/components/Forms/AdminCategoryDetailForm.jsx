import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputTextFeild from "../Inputs/InputTextFeild";
import { useEffect, forwardRef, useImperativeHandle } from "react";

const AdminCategoryDetailForm = forwardRef(
  ({ onSubmit, initialData = {} }, ref) => {
    const schema = yup.object().shape({
      name: yup
        .string()
        .required("category is required")
        .min(2, "Category must be at least 2 characters"),
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
        ...initialData,
      },
    });

    useEffect(() => {
      if (!initialData) return;
      reset({
        name: initialData?.name || "",
      });
    }, [initialData?.name, reset]);

    useImperativeHandle(ref, () => ({
      submit: () => {
        handleSubmit((formData) => {
          onSubmit({
            ...initialData,
            ...formData,
          });
        })();
      },
    }));

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-1 box-border "
      >
        <div className="w-[476px] mb-7">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputTextFeild
                {...field}
                label="Category"
                placeholder="Category"
                errors={errors.name?.message}
              />
            )}
          />
        </div>
      </form>
    );
  }
);

export default AdminCategoryDetailForm;
