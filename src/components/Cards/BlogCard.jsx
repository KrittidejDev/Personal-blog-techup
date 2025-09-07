import moment from "moment";
import { AvatarDisplay } from "../Displays/Avatar";

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
      <div className="tag mb-3">{data?.category}</div>
      <h4 className="card-title text-h4 h-14 font-bold! text-brown-31e! line-clamp-2 mb-2 hover:underline cursor-pointer">
        {data?.title}
      </h4>
      <p className="text-b2 text-brown-16b! h-16 line-clamp-3 mb-4 ">
        {data?.description}
      </p>
      <div className="flex items-center gap-x-4 text-brown-6d1 ">
        <div className="flex items-center gap-x-2 ">
          <img
            src={"/images/header-img-1.png"}
            alt={"avatar"}
            className="size-11 rounded-full"
          />
          <div className="text-b2 text-brown-03b! font-medium!">
            {data?.author}
          </div>
        </div>
        |
        <div className="text-b2 text-brown-16b! font-medium!">
          {moment(data?.date).format(`DD MMMM YYYY`)}
        </div>
      </div>
    </div>
  );
};
