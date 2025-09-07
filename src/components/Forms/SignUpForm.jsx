import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputTextFeild from "../Inputs/InputTextFeild";
import { Button } from "../ui/button";
import InputPassword from "../Inputs/InputPassword";

const SignUpForm = ({ onSubmit }) => {
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
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="bg-brown-eeb py-10 md:py-16 px-4 md:px-28 max-w-3xl w-full flex flex-col items-center rounded-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <h2 className="text-h2 text-center text-brown-31e! mb-10">Sign up</h2>
        <div className="input_wrap  mb-7">
          <Controller
            control={control}
            render={({ field }) => (
              <InputTextFeild
                {...field}
                label={"Name"}
                placeholder="Name"
                errors={errors.name?.message}
              />
            )}
            name="name"
            defaultValue=""
          />
        </div>
        <div className="input_wrap  mb-7">
          <Controller
            control={control}
            render={({ field }) => (
              <InputTextFeild
                {...field}
                label={"Username"}
                placeholder="Username"
                errors={errors.username?.message}
              />
            )}
            name="username"
            defaultValue=""
          />
        </div>{" "}
        <div className="input_wrap  mb-7">
          <Controller
            control={control}
            render={({ field }) => (
              <InputTextFeild
                {...field}
                label={"Email"}
                placeholder="Email"
                errors={errors.email?.message}
              />
            )}
            name="email"
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
                label={"Password"}
                placeholder="Password"
                errors={errors.password?.message}
              />
            )}
            name="password"
            defaultValue=""
          />
        </div>
        <div className="input_wrap mb-10">
          <Controller
            control={control}
            render={({ field }) => (
              <InputPassword
                {...field}
                type={"password"}
                label={"Confirm Password"}
                placeholder="Confirm Password"
                errors={errors.confirm_password?.message}
              />
            )}
            name="confirm_password"
            defaultValue=""
          />
        </div>
        <div className="btn_wrap flex justify-center mb-10">
          <Button className={"btn-31e"}>Sign Up</Button>
        </div>
        <div className="text-b1 text-brown-16b! flex gap-x-3 justify-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-brown-31e underline cursor-pointer hover:text-brown-16b"
          >
            Log in
          </a>
        </div>
      </form>
    </div>
  );
};

SignUpForm.propTypes = {};

export default SignUpForm;
