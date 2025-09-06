import React from "react";
import { Input } from "../ui/input";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";

const InputSearch = ({ placeholder, handleSearch }) => {
  const [_value, _setValue] = useState("");

  const _handleSearch = (e) => {
    let textData = e.target.value;
    _setValue(textData);
    handleSearch?.(textData);
  };

  return (
    <div className="flex flex-1 relative">
      <Input
        type={"text"}
        placeholder={placeholder}
        value={_value}
        onChange={_handleSearch}
        className={"bg-white!"}
      />
      <IoSearchOutline className="absolute right-2.5 top-2.5" color="#75716B" />
    </div>
  );
};

export default InputSearch;
