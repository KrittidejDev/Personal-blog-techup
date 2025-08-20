import { MainLayout } from "@/components/MainLayouts";
import { HeaderWidget } from "@/components/widgets";
import React from "react";

const Home = () => {
  return (
    <MainLayout.NavAndFooter>
      <div className="">
        <HeaderWidget />
      </div>
    </MainLayout.NavAndFooter>
  );
};

export default Home;
