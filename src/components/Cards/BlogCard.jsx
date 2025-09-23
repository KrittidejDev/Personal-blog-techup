import moment from "moment";
import { AvatarDisplay } from "../Displays/Avatar";
import BlankAvatar from "../Icons/BlankAvatar";

export const BlogCard = ({ data }) => {
  return (
    <div className=" ">
      <div className="relative h-[212px] sm:h-[360px] mb-6">
        <img
          src={data?.image}
          alt="card_img"
          className="rounded-md w-full h-full object-cover object-center "
        />
      </div>
      <div className="tag mb-3">{data?.category?.name}</div>
      <h4 className="card-title text-h4 h-14 font-bold! text-brown-31e! line-clamp-2 mb-2 hover:underline cursor-pointer">
        {data?.title}
      </h4>
      <p className="text-b2 text-brown-16b! h-16 line-clamp-3 mb-4 ">
        {data?.subtitle}
      </p>
      <div className="flex items-center gap-x-4 text-brown-6d1 ">
        <div className="flex items-center gap-x-2 ">
          {data?.author?.avatar?.url ? (
            <img
              src={data?.author?.avatar?.url}
              alt="avatar"
              className="w-11 h-11 object-cover object-center rounded-full overflow-hidden"
            />
          ) : (
            <BlankAvatar width="44" height="44" />
          )}

          <div className="text-b2 text-brown-03b! font-medium!">
            {data?.author?.name}
          </div>
        </div>
        |
        <div className="text-b2 text-brown-16b! font-medium!">
          {moment(data?.createdAt).format(`DD MMMM YYYY`)}
        </div>
      </div>
    </div>
  );
};
