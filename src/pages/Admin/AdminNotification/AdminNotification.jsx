import { userService } from "@/apiServices";
import { BgLoading } from "@/components/Displays/BgLoading";
import AdminMainLayOut from "@/components/MainLayouts/AdminMainLayOut";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const AdminNotification = () => {
  const [_isBgLoading, _setIsBgLoading] = useState(true);

  const _fetchNotification = async () => {
    try {
      const res = await userService.GET_NOTIFICATION();
      console.log("resnoti", res);
    } catch (error) {
      console.error(error);
    } finally {
      _setIsBgLoading(false);
    }
  };

  useEffect(() => {
    _fetchNotification();
  }, []);

  return (
    <AdminMainLayOut title={"Notification"}>
      {_isBgLoading ? (
        <BgLoading />
      ) : (
        <>
          {data_mockup &&
            data_mockup.map((e) => (
              <div
                key={e.comment_id}
                className="flex gap-x-3 py-10 border-b border-b-brown-6d1/40"
              >
                <img src={e.avatar} alt="" className="size-10 rounded-full" />
                <div className="flex flex-col flex-1 ">
                  <div className="text-b1 text-brown-16b! flex gap-x-1">
                    <span className=" text-brown-03b!">{e.commented_name}</span>
                    Commented on your article: <span>{e.blog_name}</span>
                  </div>
                  <div className="text-b1 text-brown-03b! mb-1.5">
                    {e.message}
                  </div>
                  <div className="text-b2 text-orange!">{e.time}</div>
                </div>
                <div>
                  <a href="#" className="underline cursor-pointer">
                    View
                  </a>
                </div>
              </div>
            ))}
        </>
      )}
    </AdminMainLayOut>
  );
};

const data_mockup = [
  {
    comment_id: 1,
    avatar: "/images/header-img-1.png",
    commented_name: "Jacob Lash",
    blog_name: " The Fascinating World of Cats: Why We Love Our Furry Friends",
    message:
      "“I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.",
    time: "12/08/68",
  },
  {
    comment_id: 2,
    avatar: "/images/header-img-1.png",
    commented_name: "Jacob Lash",
    blog_name: " The Fascinating World of Cats: Why We Love Our Furry Friends",
    message: "",
    time: "12/08/68",
  },
];

export default AdminNotification;
