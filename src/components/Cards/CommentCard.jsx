import React from "react";
import { AvatarDisplay } from "../Displays/Avatar";

const CommentCard = ({ data }) => {
  return (
    <div className="flex flex-col gap-y-6 py-6 md:py-10 ">
      <div className="flex items-center gap-x-2.5 ">
        <img
          src={data.image ? data.image : "/images/header-img-1.png"}
          alt={"avatar"}
          className="size-11 rounded-full"
        />
        <div>
          <div className="text-h4">{data.customer_name}</div>
          <div className="text-b3">{data.create_at}</div>
        </div>
      </div>
      <div className="mb">{data.comment}</div>
    </div>
  );
};

export default CommentCard;
