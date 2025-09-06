import NavAndFooter from "@/components/MainLayouts/NavAndFooter";
import BlogListWidget from "@/components/widgets/BlogListWidget";
import React from "react";

const Article = () => {
  return (
    <NavAndFooter>
      <div className="main-layout py-20">
        <BlogListWidget isViewMore />
      </div>
    </NavAndFooter>
  );
};

export default Article;
