import NavAndFooter from "@/components/MainLayouts/NavAndFooter";
import BlogListWidget from "@/components/Widgets/BlogListWidget";
import HeaderWidget from "@/components/Widgets/HeaderWidget";

const Home = () => {
  return (
    <NavAndFooter>
      <div className="main-layout">
        <HeaderWidget />
        <BlogListWidget />
      </div>
    </NavAndFooter>
  );
};

export default Home;
