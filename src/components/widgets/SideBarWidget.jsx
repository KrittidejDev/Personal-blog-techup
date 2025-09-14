import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "../ui/sidebar";
import Logo from "../Icons/Logo";
import AdminBook from "../Icons/AdminBook";
import AdminFolder from "../Icons/AdminFolder";
import AdminProfile from "../Icons/AdminProfile";
import AdminBell from "../Icons/AdminBell";
import { useLocation } from "react-router-dom";
import AdminLinkHome from "../Icons/AdminLinkHome";
import SignOutIcon from "../Icons/SignOutIcon";
import { useAuth } from "@/context/AuthContext";

const items = [
  {
    title: "Article management",
    url: "/admin/article",
    icon: AdminBook,
  },
  {
    title: "Category management",
    url: "/admin/category",
    icon: AdminFolder,
  },
  {
    title: "Profile",
    url: "/admin/profile",
    icon: AdminProfile,
  },
  {
    title: "Notification",
    url: "/admin/notification",
    icon: AdminBell,
  },
  {
    title: "Reset password",
    url: "/admin/reset-password",
    icon: AdminBell,
  },
];

const SideBarWidget = ({ collapsed, setCollapsed }) => {
  const location = useLocation().pathname;
  const { logout } = useAuth();

  const pathParts = location.split("/").filter(Boolean);
  const activePath = "/" + pathParts.slice(0, 2).join("/");

  return (
    <div
      className={`fixed top-0 left-0 bottom-0 bg-brown-eeb py-4 box-border flex flex-col  h-screen z-50  transition-all! duration-300! ${
        !collapsed ? "w-[280px] " : "w-[80px]"
      }`}
    >
      <SidebarHeader>
        <div
          className={`flex justify-between ml-5 ${
            collapsed ? "flex-col-reverse" : "flex-row"
          }`}
        >
          <a
            href="/"
            className={`flex flex-1 flex-col cursor-pointer  ${
              !collapsed ? "my-[60px]" : "my-10"
            }`}
          >
            {!collapsed ? (
              <Logo width="60" height="60" />
            ) : (
              <Logo width="24" height="24" />
            )}
            {!collapsed && (
              <div className="text-[#F2B68C] text-xl font-semibold">
                Admin panel
              </div>
            )}
          </a>

          <SidebarTrigger
            onClick={() => setCollapsed(!collapsed)}
            className={"-ml-1 mt-3"}
          />
        </div>
      </SidebarHeader>
      <SidebarContent className={" "}>
        <div>
          <div className=" overflow-y-auto flex-1 ">
            {items.map((item) => (
              <div key={item.title}>
                <button className="w-full">
                  <a
                    href={item.url}
                    className={` flex items-center gap-3 p-6 font-medium  transition-colors
                          ${
                            activePath === item.url
                              ? "bg-brown-6d1 text-brown-03b"
                              : "text-brown-16b hover:bg-brown-6d1/30 hover:text-brown-03b"
                          }
                        `}
                  >
                    <item.icon
                      color={activePath === item.url ? "#26231E" : "#75716B"}
                    />
                    {!collapsed && <span>{item.title}</span>}
                  </a>
                </button>
              </div>
            ))}
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter className={"p-0 gap-0 "}>
        <button className="w-full ">
          <a
            href={"/"}
            className={` flex items-center gap-3 p-6 font-medium  transition-colors
                          ${
                            activePath === "/"
                              ? "bg-brown-6d1 text-brown-03b"
                              : "text-brown-16b hover:bg-brown-6d1/30 hover:text-brown-03b"
                          }
                        `}
          >
            <AdminLinkHome color={"#75716B"} />
            {!collapsed && <span>hh.website</span>}
          </a>
        </button>
        <button
          className={`w-full flex items-center gap-3 p-6 font-medium  transition-color text-brown-16b hover:bg-brown-6d1/30 hover:text-brown-03b border-t border-t-brown-6d1/30 cursor-pointer`}
          onClick={logout}
        >
          <SignOutIcon color={"#75716B"} />
          {!collapsed && <span>Log out</span>}
        </button>
      </SidebarFooter>
    </div>
  );
};

export default SideBarWidget;
