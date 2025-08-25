import React from "react";
import FilterBarWidget from "./FilterBarWidget";
import { BlogCard } from "../Cards/BlogCard";
import { blogPosts } from "@/util/data/blogPosts";
import { useNavigate } from "react-router-dom";

const BlogListWidget = ({ isViewMore }) => {
  const router = useNavigate();

  const _handleClickCard = (id) => {
    router(`/article/${id}`);
  };

  const _handleClickViewMore = () => {
    router("/article");
  };

  return (
    <div className="container ">
      <FilterBarWidget />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 ">
        {blogPosts &&
          blogPosts.map((e) => (
            <div key={e.id} onClick={() => _handleClickCard(e.id)}>
              <BlogCard data={e} />
            </div>
          ))}
      </div>
      {!isViewMore && (
        <div className="flex justify-center  pt-12 pb-14 md:pt-20 md:pb-32">
          <a
            href="/article"
            className=" underline cursor-pointer hover:text-blue-700! text-b1 text-brown-31e"
            onClick={_handleClickViewMore}
          >
            View more
          </a>
        </div>
      )}
    </div>
  );
};

export default BlogListWidget;
