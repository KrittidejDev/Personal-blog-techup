import React from "react";
import { Atom } from "react-loading-indicators";

export const BgLoading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Atom color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
    </div>
  );
};
