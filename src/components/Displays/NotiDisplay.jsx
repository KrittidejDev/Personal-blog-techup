import React, { useEffect, useRef, useState } from "react";
import BellIcon from "../Icons/BellIcon";
import { userService } from "@/apiServices";
import { BASE_API } from "@/apiServices/apiConfig";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const NotiDisplay = ({ className }) => {
  const router = useNavigate();
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const [_isOpen, _setIsOpen] = useState(false);
  const [_notiData, _setNotiData] = useState([]);
  const _isNoti = _notiData?.length > 0;

  const _fetchNotification = async () => {
    try {
      const res = await userService.GET_NOTIFICATION(`?read=false`);
      console.log("res noti", res);
      if (res.status === 200) {
        _setNotiData(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    _fetchNotification();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        _setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const _handleOpen = () => {
    if (_isNoti) {
      _setIsOpen((prev) => !prev);
    }
  };

  const _handleClickNoti = async (data) => {
    let id = data?._id;
    let path = data?.blog?._id;
    try {
      let res = await userService.PUT_NOTIFICATION_READ(id);
      if (res.status === 200) {
        router(`/article/${path}`);
        _fetchNotification();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${className} relative`} ref={dropdownRef}>
      {/* 🔔 Bell */}
      <div className="flex items-center gap-x-2.5 " onClick={_handleOpen}>
        <div className="h-12 w-12 rounded-full border border-brown-eeb flex items-center justify-center">
          <BellIcon />
        </div>
        {_isNoti && (
          <div className="absolute h-2 w-2 rounded-full bg-red-500 top-1 right-1" />
        )}
      </div>

      {/* 📌 Dropdown */}
      {_isOpen && (
        <div
          className="absolute flex flex-col w-[362px] bg-white top-16 right-0 rounded-lg shadow-lg overflow-hidden z-40 py-6 px-4 gap-y-4"
          onMouseLeave={() => {
            timeoutRef.current = setTimeout(() => _setIsOpen(false), 1000);
          }}
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }}
        >
          {_notiData.slice(0, 5).map((e) => (
            <div
              key={e._id}
              className="px-4 py-2 hover:bg-brown-8f6 cursor-pointer"
              onClick={() => _handleClickNoti(e)}
            >
              <div className="flex items-center gap-x-2.5 ">
                <img
                  src={e.image ? e.image : "/images/header-img-1.png"}
                  alt={"avatar"}
                  className="size-12 rounded-full"
                />

                <div className="flex flex-1 flex-col">
                  <div className="text-base font-bold text-brown-03b! line-clamp-2 ">
                    {e?.sender?.name}
                    <span className="text-brown-16b font-medium ml-2">
                      {e.type === "author"
                        ? "Published new article."
                        : e.type === "like"
                        ? "Like your article"
                        : "Comment on the article you have commented on."}
                    </span>
                  </div>
                  <div className="text-b3 text-brown-16b!">
                    {moment().diff(moment(e?.createdAt), "hours") < 24
                      ? moment(e?.createdAt).fromNow()
                      : moment(e?.createdAt).format("DD MMMM YYYY [at] HH:mm")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
