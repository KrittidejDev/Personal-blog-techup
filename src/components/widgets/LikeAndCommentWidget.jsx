import React from "react";
import { Button } from "../ui/button";
import { CiFaceSmile } from "react-icons/ci";
import { LuCopy } from "react-icons/lu";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { useLocation } from "react-router-dom";
import CommentForm from "../Forms/CommentForm";
import CommentCard from "../Cards/CommentCard";
import { toast } from "react-toastify";

const LikeAndCommentWidget = ({ data, onComment, onLike }) => {
  const location = useLocation();
  const shareUrl = window.location.origin + location.pathname;
  const title = data?.title || "";

  const _handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${title} ${shareUrl}`);
      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap px-6 py-4 bg-brown-eeb rounded-2xl mb-6 md:mb-12">
        <Button
          className="btn-border-16b text-b1 text-brown-31e group w-full md:w-fit mb-6 md:mb-0 bg-white!  hover:bg-brown-31e!"
          onClick={() => onLike()}
        >
          <CiFaceSmile className="text-brown-31e group-hover:text-white mb-0.5" />
          {data?.likesCount}
        </Button>
        <div className="flex items-center justify-center gap-x-3 w-full md:w-fit">
          <Button
            className="btn-border-16b text-b1 text-brown-31e flex-1 bg-white! hover:bg-brown-31e! group"
            onClick={_handleCopyLink}
          >
            <LuCopy className="text-brown-31e group-hover:text-white  text-2xl" />{" "}
            Copy link
          </Button>

          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon
              size={40}
              round
              className="transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon
              size={40}
              round
              className="transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </TwitterShareButton>

          <LinkedinShareButton url={shareUrl} title={title}>
            <LinkedinIcon
              size={40}
              round
              className="transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </LinkedinShareButton>
        </div>
      </div>
      <div className="mb-6 md:mb-12">
        <CommentForm onSubmit={onComment} />
      </div>
      <div className="">
        {data.comments?.map((e) => (
          <div
            key={e._id}
            className="border-b-[1px] border-b-brown-6d1 last:border-none "
          >
            <CommentCard data={e} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikeAndCommentWidget;
