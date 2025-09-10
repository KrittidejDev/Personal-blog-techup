import React, { useState } from "react";
import { Button } from "../ui/button";
import InputSearch from "../Inputs/InputSearch";
import { InputDropdown } from "../Inputs/InputDropdown";
import { filterOptions } from "@/util/data/common";

const FilterBarWidget = () => {
  const [_filterActive, _setFilterActive] = useState("1");

  const _handleFilterClick = (e) => {
    _setFilterActive(e);
  };

  return (
    <div className="container ">
      <div className="title text-h3 mb-8">Latest articles</div>
      <div className="flex justify-between items-end filter-wrap w-full bg-brown-eeb rounded-2xl px-4 py-4 md:px-6 md:py-4 flex-wrap gap-4 box-border">
        <div className="row-left hidden md:flex">
          {filterOptions.map((e, i) => (
            <Button
              key={i}
              className={`filter-button ${
                _filterActive === e.value && "bg-brown-6d1! text-brown-03b!"
              }`}
              onClick={() => {
                _handleFilterClick(e.value);
              }}
            >
              {e.label}
            </Button>
          ))}
        </div>
        <div className="row-right flex-1 min-w-40 sm:min-w-3xs md:max-w-72">
          <InputSearch />
        </div>
        <div className="row-right flex-1 min-w-40 sm:min-w-3xs md:hidden">
          <InputDropdown
            label={"Category"}
            options={filterOptions}
            value={_filterActive}
            onChange={_handleFilterClick}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBarWidget;
