import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../ui/button";
import InputTextArea from "../Inputs/InputTextArea";

const CommentForm = ({ onSubmit }) => {
  const schema = yup.object().shape({
    comment: yup
      .string()
      .required("comment is required")
      .min(5, "comment must be at least 5 characters"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="input_wrap  mb-4">
          <Controller
            control={control}
            render={({ field }) => (
              <InputTextArea
                {...field}
                className="bg-white"
                rows={4}
                label={"Comment"}
                placeholder="What are your thoughts?"
                errors={errors.comment?.message}
              />
            )}
            name="comment"
            defaultValue=""
          />
        </div>
        <div className="btn_wrap flex justify-start md:justify-end mb-10">
          <Button className={"btn-31e"}>Send</Button>
        </div>
      </form>
    </div>
  );
};

CommentForm.propTypes = {};

export default CommentForm;
