import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputTextFeild from "../Inputs/InputTextFeild";
import { forwardRef, useImperativeHandle } from "react";
import InputPassword from "../Inputs/InputPassword";

const ResetPasswordForm = forwardRef(({ onSubmit }, ref) => {
  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Current password is required")
      .min(8, "Password must be at least 8 characters"),
    new_password: yup
      .string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters"),
    confirm_new_password: yup
      .string()
      .required("Please confirm your new password")
      .oneOf([yup.ref("new_password")], "Passwords must match"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useImperativeHandle(ref, () => ({
    submit: () => {
      handleSubmit(onSubmit)();
    },
  }));

  return (
    // <div className="bg-brown-eeb py-10 md:py-16 px-4 md:px-28 max-w-3xl w-full flex flex-col items-center rounded-2xl">
    <div className="max-w-[480px]">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="input_wrap mb-7">
          <Controller
            control={control}
            render={({ field }) => (
              <InputPassword
                {...field}
                type={"password"}
                label={"Password"}
                placeholder="Password"
                errors={errors.password?.message}
              />
            )}
            name="password"
            defaultValue=""
          />
        </div>
        <div className="input_wrap mb-7">
          <Controller
            control={control}
            render={({ field }) => (
              <InputPassword
                {...field}
                type={"password"}
                label={"New password"}
                placeholder="New password"
                errors={errors.new_password?.message}
              />
            )}
            name="new_password"
            defaultValue=""
          />
        </div>
        <div className="input_wrap mb-7">
          <Controller
            control={control}
            render={({ field }) => (
              <InputPassword
                {...field}
                type={"password"}
                label={"Confirm new password"}
                placeholder="Confirm new password"
                errors={errors.confirm_new_password?.message}
              />
            )}
            name="confirm_new_password"
            defaultValue=""
          />
        </div>
      </form>
    </div>
  );
});

ResetPasswordForm.propTypes = {};

export default ResetPasswordForm;
