import { userService } from "@/apiServices";
import { BgLoading } from "@/components/Displays/BgLoading";
import NavAndFooter from "@/components/MainLayouts/NavAndFooter";
import BlogListWidget from "@/components/widgets/BlogListWidget.jsx";
import HeaderWidget from "@/components/widgets/HeaderWidget";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [_data, _setData] = useState();
  const [_isBgLoading, _setIsBgLoading] = useState(true);

  const _fetchHeaderData = async () => {
    try {
      const res = await userService.GET_ADMIN_PUBLIC();
      console.log("res admin", res);
      if (res.status === 200) {
        _setData(res.admin);
      }
    } catch (error) {
      console.error(error);
    } finally {
      _setIsBgLoading(false);
    }
  };

  useEffect(() => {
    _fetchHeaderData();
  }, []);

  return (
    <NavAndFooter>
      <div className="main-layout">
        {_isBgLoading ? (
          <BgLoading />
        ) : (
          <>
            <HeaderWidget data={_data} />
            <BlogListWidget />
          </>
        )}
      </div>
    </NavAndFooter>
  );
};

export default Home;
