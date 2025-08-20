import React from "react";
import { Icons } from "../Icons";

const FooterWidget = () => {
  return (
    <div className="footer-container">
      <div className="container  flex justify-between items-center">
        <div className="f-left flex items-center gap-x-6">
          <div className="">Get in touch</div>
          <div className="flex items-center gap-x-4">
            <a href="/">
              <Icons.LinkInCircle />
            </a>
            <a href="/">
              <Icons.GitCircle />
            </a>
            <a href="/">
              <Icons.GoogleCircle />
            </a>
          </div>
        </div>
        <div className="f-right">
          <a href="/">Home page</a>
        </div>
      </div>
    </div>
  );
};

export default FooterWidget;
