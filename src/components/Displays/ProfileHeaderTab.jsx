import React from "react";
import BlankAvatar from "../Icons/BlankAvatar";

const ProfileHeaderTab = ({ data, page }) => {
  return (
    <div className="flex flex-1 gap-x-4 items-center md:mb-[30px]  py-6 px-4 md:p-0  ">
      {data?.avatar?.url ? (
        <div className="w-11 h-11 rounded-full overflow-hidden box-border">
          <img
            src={data?.avatar?.url}
            alt="avatar"
            className="w-full h-full object-cover object-center"
          />
        </div>
      ) : (
        <BlankAvatar width="44" height="44" />
      )}
      <div className="text-h4 md:text-2xl! text-brown-16b! line-clamp-1 overflow-ellipsis  whitespace-nowrap md:min-w-42">
        {data?.name}
      </div>
      <div className="w-[1px] h-7 bg-brown-6d1 " />
      <div className="text-h4 md:text-2xl! text-brown-31e! whitespace-nowrap ">
        {page}
      </div>
    </div>
  );
};

export default ProfileHeaderTab;
