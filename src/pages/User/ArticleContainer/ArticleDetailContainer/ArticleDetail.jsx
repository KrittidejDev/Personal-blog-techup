import NavAndFooter from "@/components/MainLayouts/NavAndFooter";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ArticleProfileWidget from "@/components/widgets/ArticleProfileWidget";
import LikeAndCommentWidget from "@/components/widgets/LikeAndCommentWidget";
import { userService } from "@/apiServices";
import { BgLoading } from "@/components/Displays/BgLoading";
import { useAuth } from "@/context/AuthContext";
import ModalEmpty from "@/components/Displays/ModalEmpty";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ArticleDetail = () => {
  const { user } = useAuth();
  const userId = user?._id || null;
  const { id } = useParams();
  const router = useNavigate();
  const [_data, _setData] = useState();
  const [_isBgLoading, _setIsBgLoading] = useState(true);
  const [_showModal, _setIsShowModal] = useState(false);
  const [_likeData, _setLikeData] = useState();

  const _fetchBlogData = async () => {
    _setIsBgLoading(true);
    try {
      const res = await userService.GET_ARTICLE_BY_ID(id);
      if (res.status === 200) {
        _setData(res.data[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      _setIsBgLoading(false);
    }
  };

  useEffect(() => {
    _fetchBlogData();
  }, [id]);

  const _handleComment = async (data) => {
    _setIsBgLoading(true);
    try {
      if (!userId) {
        _setIsShowModal(true);
      } else {
        let params = {
          blog: id,
          content: data.comment,
        };
        let res = await userService.POST_CREATE_COMMENTS(params);
        if (res.status === 201) {
          toast.success("Comment success");
          _fetchBlogData(id);
        }
      }
    } catch (error) {
      error.log(error);
    } finally {
      _setIsBgLoading(false);
    }
  };

  const _handleCloseModal = () => {
    _setIsShowModal(false);
  };

  const _handleLikes = async () => {
    try {
      const myLike = _data.likes.find((like) => like.user._id === userId);
      let res;
      if (myLike) {
        res = await userService.DELETE_UNLIKE(id);
        if (res.status === 200) {
          toast.info("You unliked this blog");
        }
      } else {
        res = await userService.POST_LIKE(id);
        if (res.status === 200) {
          toast.success("You liked this blog");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      await _fetchBlogData();
    }
  };

  return (
    <NavAndFooter>
      {_isBgLoading ? (
        <BgLoading />
      ) : (
        <>
          <div className="flex items-center justify-center w-full box-border  ">
            <div className="max-w-[1200px] w-full aspect-[1200/587] overflow-hidden md:rounded-md md:mt-[60px]">
              <img
                src={_data?.image}
                alt="blog image"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
          <div className="main-layout min-h-screen pb-10 md:pb-12 px-6 md:px-12">
            <div className="container pt-6 lg:pt-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8  lg:gap-20">
                {/* Main Content - 8 columns */}
                <div className="w-full lg:col-span-8">
                  <div className="flex gap-x-4 items-center mb-4">
                    <div className="tag">{_data?.category?.name}</div>
                    <div className="text-b2 text-brown-16b! font-medium!">
                      {moment(_data?.createdAt).format("DD MMMM YYYY")}
                    </div>
                  </div>
                  <h2 className=" text-h3 md:text-h2 text-brown-31e! mb-8 ">
                    {_data?.title}
                  </h2>
                  <p className="text-b1 text-brown-16b! leading-relaxed">
                    {_data?.subtitle}
                  </p>
                  <div className="prose max-w-none space-y-6 mb-6 lg:mb-12">
                    <div className="markdown">
                      <ReactMarkdown
                        children={_data?.content}
                        components={{
                          h2: ({ ...props }) => (
                            <h2
                              className="text-h4  text-brown-03b! my-4"
                              {...props}
                            />
                          ),
                          p: ({ ...props }) => (
                            <p
                              className="text-b1 text-brown-16b! leading-relaxed"
                              {...props}
                            />
                          ),
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex lg:hidden mb-10 ">
                    <ArticleProfileWidget data={_data?.author} />
                  </div>
                  <div className="mb-6 md:mb-12">
                    <LikeAndCommentWidget
                      data={_data || []}
                      onComment={_handleComment}
                      onLike={_handleLikes}
                    />
                  </div>
                </div>
                <div className=" lg:col-span-4 ">
                  <div className="hidden lg:grid sticky top-5 z-10">
                    <ArticleProfileWidget data={_data?.author} />
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </>
      )}
      <ModalEmpty
        isShowModal={_showModal}
        onClose={_handleCloseModal}
        isCloseBtn
      >
        <div className="flex flex-col items-center">
          <div className="w-lg p-5 text-h2 text-brown-31e! text-center mb-10">
            Create an account to continue
          </div>
          <Button
            className={"mb-10 btn-31e"}
            onClick={() => {
              router("/register");
            }}
          >
            Create account
          </Button>
          <div className="flex gap-x-3 text-brown-16b ">
            Already have an account?
            <a
              href="/login"
              className="text-brown-31e underline cursor-pointer hover:text-brown-16b"
            >
              Log in
            </a>
          </div>
        </div>
      </ModalEmpty>
    </NavAndFooter>
  );
};

export default ArticleDetail;
