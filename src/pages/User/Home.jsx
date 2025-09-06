import NavAndFooter from "@/components/MainLayouts/NavAndFooter";
import BlogListWidget from "@/components/widgets/BlogListWidget.jsx";
import HeaderWidget from "@/components/widgets/HeaderWidget";

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
