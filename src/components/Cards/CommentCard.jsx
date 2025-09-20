import React from "react";
import moment from "moment";
import { Button } from "../ui/button";
import { useState } from "react";

const CommentCard = ({ data }) => {
  const [_onReply, _setOnReply] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 py-6 md:py-10 ">
      <div className="flex items-center gap-x-2.5 ">
        <img
          src={data.image ? data.image : "/images/header-img-1.png"}
          alt={"avatar"}
          className="size-11 rounded-full"
        />
        <div>
          <div className="text-h4 text-brown-03b!">{data?.user?.name}</div>
          <div className="text-b3 text-brown-16b!">
            {moment(data?.createdAt).format(`DD MMMM YYYY [at] HH:MM`)}
          </div>
        </div>
      </div>
      <div className="text-b1 text-brown-16b! whitespace-pre-wrap">
        {data?.content}
      </div>
    </div>
  );
};

export default CommentCard;
