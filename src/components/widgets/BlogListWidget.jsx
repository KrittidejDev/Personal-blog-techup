import React, { useEffect } from "react";
import FilterBarWidget from "./FilterBarWidget";
import { BlogCard } from "../Cards/BlogCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BgLoading } from "../Displays/BgLoading";
import { userService } from "@/apiServices";
import { Pagination } from "../Tables/TablePagination";

const BlogListWidget = ({ isViewMore }) => {
  const router = useNavigate();
  const [_dataArticle, _setDataArticle] = useState();
  const [_isBgLoading, _setIsBgLoading] = useState(true);
  const [_search, _setSearch] = useState();
  const [_page, _setPage] = useState();
  const [_status, _setStatus] = useState("Publish");
  const [_category, _setCategory] = useState();
  const [_paginationData, _setPaginationData] = useState();
  const [_dataSearch, _setDataSearch] = useState();

  const _fetchArticle = async () => {
    _setIsBgLoading(true);
    try {
      const query = new URLSearchParams();
      // if (_search) query.append("search", _search);
      if (_page) query.append("page", _page);
      if (_status) query.append("status", _status);
      if (_category) query.append("category", _category);
      const queryString = query.toString() ? `?${query.toString()}` : "";
      const res = await userService.GET_ARTICLE(queryString);
      if (res.status === 200) {
        _setPaginationData({
          page: res.page,
          total: res.total,
          totalPages: res.totalPages,
        });
        _setDataArticle(res.data[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      _setIsBgLoading(false);
    }
  };

  useEffect(() => {
    _fetchArticle();
  }, [_page, _status, _category]);

  const _handleClickCard = (id) => {
    router(`/article/${id}`);
  };

  const _handleClickViewMore = () => {
    router("/article");
  };

  const _handlePageChange = (newPage) => {
    _setPage(newPage);
  };

  const _fetchSuggestion = async () => {
    try {
      if (_search) {
        const res = await userService.GET_ARTICLE(`?search=${_search}`);
        if (res.status === 200) {
          _setDataSearch(res.data[0]);
        }
      } else {
        _setDataSearch(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    _fetchSuggestion();
  }, [_search]);

  return (
    <div className="container ">
      <FilterBarWidget
        onCategorySelect={(e) => _setCategory(e)}
        onSearch={(e) => {
          _setSearch(e);
        }}
        dataSearch={_dataSearch}
      />
      {_isBgLoading ? (
        <BgLoading />
      ) : (
        <>
          {_dataArticle ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 ">
                {_dataArticle
                  .slice(0, isViewMore ? _dataArticle.length : 6)
                  .map((e) => (
                    <div key={e._id} onClick={() => _handleClickCard(e._id)}>
                      <BlogCard data={e} />
                    </div>
                  ))}
              </div>
              {!isViewMore ? (
                <div className="flex justify-center  pt-12 pb-14 md:pt-20 md:pb-32">
                  <a
                    href="/article"
                    className=" underline cursor-pointer hover:text-blue-700! text-b1 text-brown-31e"
                    onClick={_handleClickViewMore}
                  >
                    View more
                  </a>
                </div>
              ) : (
                <div className="mt-20">
                  <Pagination
                    totalItems={_paginationData.total}
                    currentPage={_paginationData.page}
                    totalPages={_paginationData.totalPages}
                    onPageChange={_handlePageChange}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center flex p-30 justify-center mb-50 ">
              ฺBlog not found
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlogListWidget;
