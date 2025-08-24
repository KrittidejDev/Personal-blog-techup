import React from "react";
import FilterBarWidget from "./FilterBarWidget";
import { BlogCard } from "../Cards/BlogCard";
import { blogPosts } from "@/util/data/blogPosts";

const BlogListWidget = () => {
  return (
    <div className="container">
      <FilterBarWidget />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 pb-32">
        {blogPosts &&
          blogPosts.map((e) => (
            <div key={e.id}>
              <BlogCard data={e} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogListWidget;
