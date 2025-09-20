import React, { useState } from "react";
import { Button } from "../ui/button";
import InputSearch from "../Inputs/InputSearch";
import { InputDropdown } from "../Inputs/InputDropdown";
import { userService } from "@/apiServices";
import { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useNavigate } from "react-router-dom";

const FilterBarWidget = ({ onCategorySelect, onSearch, dataSearch }) => {
  const router = useNavigate();
  const [_filterActive, _setFilterActive] = useState("all");
  const [_dataCategory, _setDataCategory] = useState();

  const _handleFilterClick = (e) => {
    if (e !== "all") {
      onCategorySelect?.(e);
    } else {
      onCategorySelect?.("");
    }
    _setFilterActive(e);
  };

  const _fetchCategory = async () => {
    try {
      const res = await userService.GET_CATEGORY();
      if (res.status === 200) {
        const categories = [{ _id: "all", name: "All" }, ...res.categories];
        _setDataCategory(categories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    _fetchCategory();
  }, []);

  return (
    <div className="container ">
      <div className="title text-h3 mb-8">Latest articles</div>
      <div className=" relative flex justify-between items-end filter-wrap w-full bg-brown-eeb rounded-2xl px-4 py-4 md:px-6 md:py-4 flex-wrap gap-4 box-border">
        <div className=" hidden px-2.5 gap-x-2.5  md:flex  ">
          <Carousel
            opts={{
              align: "start",
            }}
            className="ml-6 w-full max-w-[30lvw]"
          >
            <CarouselContent className="-ml-1">
              {_dataCategory &&
                _dataCategory.map((e) => (
                  <CarouselItem key={e._id} className="pl-1 md:basis-1/4">
                    <Button
                      key={e._id}
                      className={`filter-button hover:bg-brown-6d1/30! w-full ${
                        _filterActive === e._id &&
                        "bg-brown-6d1! text-brown-03b!"
                      }`}
                      onClick={() => {
                        _handleFilterClick(e._id);
                      }}
                    >
                      {e.name}
                    </Button>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious
              className={
                "bg-transparent border-none shadow-none cursor-pointer"
              }
            />
            <CarouselNext
              className={
                "bg-transparent border-none shadow-none cursor-pointer"
              }
            />
          </Carousel>
        </div>
        <div className="row-right flex-1 min-w-40 sm:min-w-3xs md:max-w-72">
          <InputSearch handleSearch={onSearch} />
        </div>
        <div className="row-right flex-1 min-w-40 sm:min-w-3xs md:hidden">
          <InputDropdown
            label={"Category"}
            options={
              _dataCategory?.map((e) => ({
                value: e._id,
                label: e.name,
              })) || []
            }
            value={_filterActive}
            onChange={_handleFilterClick}
          />
        </div>
        {dataSearch && (
          <div className="scrollbar-hide  absolute top-18 left-3 right-4 md:left-auto md:right-6 py-2 rounded-[12px] bg-brown-8f6 max-h-100 w-auto md:w-full max-w-[360px] overflow-x-auto z-50 shadow-md">
            {dataSearch.map((e) => (
              <div
                key={e._id}
                className="text-b1 text-brown-03b! py-2 px-4 cursor-pointer hover:bg-brown-6d1"
                onClick={() => {
                  router(`/article/${e._id}`);
                }}
              >
                {e.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBarWidget;
