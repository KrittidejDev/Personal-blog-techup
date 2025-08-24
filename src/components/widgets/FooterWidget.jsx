import React from "react";
import LinkInCircle from "../Icons/LinkInCircle";
import GitCircle from "../Icons/GitCircle";
import GoogleCircle from "../Icons/GoogleCircle";

const FooterWidget = () => {
  return (
    <div className="footer-container">
      <div className="container  flex justify-between items-center">
        <div className="f-left flex items-center gap-x-6">
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
        <div className="f-right">
          <a href="/">Home page</a>
        </div>
      </div>
    </div>
  );
};

export default FooterWidget;
