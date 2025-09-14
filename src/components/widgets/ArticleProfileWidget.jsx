import React from "react";

const ArticleProfileWidget = ({ data }) => {
  console.log(data);

  return (
    <div className="w-full box-border overflow-hidden bg-brown-eeb p-6 md:p-10 rounded-2xl shadow-lg">
      <div className="flex items-center gap-x-2 mb-5">
        <img
          src={
            data?.avatar?.url ||
            "https://gravatar.com/avatar/f5921567c2722f4ca3abdc7e226046c0?s=200&d=robohash&r=x"
          }
          alt={"avatar"}
          className="size-11 rounded-full"
        />
        <div className="text-h4 text-brown-03b! font-medium! flex flex-col">
          <span className="text-b3 text-brown-16b! mb-[-5px]">Author</span>
          {data?.name}
        </div>
      </div>
      <div className="w-full border-b-[1px] border-b-brown-6d1 mb-5" />
      <p className="whitespace-pre-wrap text-b1 text-brown-16b!">{data?.bio}</p>
    </div>
  );
};

export default ArticleProfileWidget;
