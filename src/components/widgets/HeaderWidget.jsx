import React from "react";

const HeaderWidget = () => {
  return (
    <div className="container py-[60px] flex items-center justify-center gap-x-[60px] gap-y-10 flex-wrap">
      <div className="cal-3-card md:max-w-1">
        <h1 className="text-h2 md:text-h1 text-center lg:text-right mb-6 lg:w-[80%] lg:ml-auto">
          Stay Informed, Stay Inspired
        </h1>
        <p className="text-b1 text-center lg:text-right">
          Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
          Inspiration and Information.
        </p>
      </div>
      <img
        src="/images/header-img-1.png"
        alt=""
        className="cal-3-card md:max-w-1/3"
      />
      <div className="cal-3-card md:max-w-1/3">
        <div className="auther text-b3 text-brown-16b mb-1 ">-Author</div>
        <h3 className="title text-h3 mb-3">Krittidej J.</h3>
        <p className="text-b1 mb-4">
          I am a pet enthusiast and freelance writer who specializes in animal
          behavior and care. With a deep love for cats, I enjoy sharing insights
          on feline companionship and wellness.
        </p>
        <p className="text-b1 mb-4">
          When i’m not writing, I spends time volunteering at my local animal
          shelter, helping cats find loving homes.
        </p>
      </div>
    </div>
  );
};

export default HeaderWidget;
