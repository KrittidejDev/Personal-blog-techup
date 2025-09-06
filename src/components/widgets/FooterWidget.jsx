import React from "react";
import LinkInCircle from "../Icons/LinkInCircle";
import GitCircle from "../Icons/GitCircle";
import GoogleCircle from "../Icons/GoogleCircle";

const FooterWidget = () => {
  return (
    <div className="footer-container">
      <div className="container flex flex-wrap justify-between items-center gap-y-6 box-border ">
        <div className=" flex flex-1 sm:justify-start justify-center items-center whitespace-nowrap gap-x-6">
          <div className="">Get in touch</div>
          <div className="flex items-center gap-x-4">
            <a href="/">
              <LinkInCircle />
            </a>
            <a href="/">
              <GitCircle />
            </a>
            <a href="/">
              <GoogleCircle />
            </a>
          </div>
        </div>
        <div className="flex-1 flex sm:justify-end justify-center whitespace-nowrap ">
          <a href="/">Home page</a>
        </div>
      </div>
    </div>
  );
};

export default FooterWidget;
