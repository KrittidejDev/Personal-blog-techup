import React from "react";
import moment from "moment";
import { useState } from "react";
import BlankAvatar from "../Icons/BlankAvatar";

const CommentCard = ({ data }) => {
  const [_onReply, _setOnReply] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 py-6 md:py-10 ">
      <div className="flex items-center gap-x-2.5 ">
        {data?.user?.avatar?.url ? (
          <img
            src={data?.user?.avatar?.url}
            alt="avatar"
            className="w-12 h-12 object-cover object-center rounded-full overflow-hidden"
          />
        ) : (
          <BlankAvatar width="48" height="48" />
        )}
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
