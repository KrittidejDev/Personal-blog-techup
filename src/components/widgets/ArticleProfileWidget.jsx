import React from "react";
import { AvatarDisplay } from "../Displays/Avatar";

const ArticleProfileWidget = ({ data }) => {
  return (
    <div className="w-full box-border overflow-hidden bg-brown-eeb p-6 md:p-10 rounded-2xl shadow-lg">
      <div className="flex items-center gap-x-2 mb-5">
        <AvatarDisplay
          src={"/images/header-img-1.png"}
          alt={"avatar"}
          className="size-11"
        />
        <div className="text-h4 text-brown-03b! font-medium! flex flex-col">
          <span className="text-b3 text-brown-16b! mb-[-5px]">Author</span>
          {data?.author}
        </div>
      </div>
      <div className="w-full border-b-[1px] border-b-brown-6d1 mb-5" />
      <p className="whitespace-pre-wrap text-b1 text-brown-16b!">
        {`I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness. \n \nWhen I'm not writing, I spend time volunteering at my local animal shelter, helping cats find loving homes.`}
      </p>
    </div>
  );
};

export default ArticleProfileWidget;
