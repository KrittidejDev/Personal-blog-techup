import { AvatarDisplay } from "@/components/Displays/Avatar";
import NavAndFooter from "@/components/MainLayouts/NavAndFooter";
import { blogPosts } from "@/util/data/blogPosts";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const ArticleDetail = () => {
  const { id } = useParams();
  const [_data, _setData] = useState([]);

  // สร้างเผื่อ fetch จริง

  useEffect(() => {
    _fetchBlogData();
  }, [id]);

  const _fetchBlogData = () => {
    const res = blogPosts.find((item) => String(item.id) === String(id));
    _setData(res);
  };

  ///////

  return (
    <NavAndFooter>
      <div className="flex items-center justify-center px-6 w-full box-border md:px-12 box-border">
        <div className="max-w-[1200px] w-full aspect-[1200/587] overflow-hidden md:rounded-md md:mt-[60px]">
          <img
            src={_data?.image}
            alt="blog image"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
      <div className="main-layout min-h-screen pb-10 md:pb-12">
        <div className="container pt-6 lg:pt-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-20">
            {/* Main Content - 8 columns */}
            <div className="md:col-span-8">
              <div className="flex gap-x-4 items-center mb-4">
                <div className="tag">{_data?.category}</div>
                <div className="text-b2 text-brown-16b! font-medium!">
                  {moment(_data?.date).format("DD MMMM YYYY")}
                </div>
              </div>
              <h2 className="text-h2 text-brown-31e! mb-8">{_data?.title}</h2>
              <p className="text-b1 text-brown-16b! leading-relaxed">
                {_data?.description}
              </p>
              <div className="prose max-w-none space-y-6">
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
            <div className="md:col-span-4">
              <div className="sticky top-5 z-10">
                <div className="w-full box-border overflow-hidden bg-brown-eeb p-6 md:p-10 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-x-2 mb-5">
                    <AvatarDisplay
                      src={"/images/header-img-1.png"}
                      alt={"avatar"}
                      className="size-11"
                    />
                    <div className="text-h4 text-brown-03b! font-medium! flex flex-col">
                      <span className="text-b3 text-brown-16b! mb-[-5px]">
                        Author
                      </span>
                      {_data?.author}
                    </div>
                  </div>
                  <div className="w-full border-b-[1px] border-b-brown-6d1 mb-5" />
                  <p className="whitespace-pre-wrap text-b1 text-brown-16b!">
                    {`I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness. \n \nWhen I'm not writing, I spend time volunteering at my local animal shelter, helping cats find loving homes.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavAndFooter>
  );
};

export default ArticleDetail;
