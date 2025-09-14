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

const ArticleDetail = () => {
  const { id } = useParams();
  const [_data, _setData] = useState();
  const [_isBgLoading, _setIsBgLoading] = useState(true);

  const _fetchBlogData = async () => {
    _setIsBgLoading(true);
    try {
      const res = await userService.GET_ARTICLE_BY_ID(id);
      console.log("res", res);
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

  console.log("data", _data);

  return (
    <NavAndFooter>
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
                {/* <LikeAndCommentWidget data={_data} /> */}
              </div>
            </div>
            <div className=" lg:col-span-4 ">
              <div className="hidden lg:grid sticky top-5 z-10">
                <ArticleProfileWidget data={_data?.author} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavAndFooter>
  );
};

export default ArticleDetail;
