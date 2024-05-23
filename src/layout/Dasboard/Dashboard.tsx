import { Avatar, Badge, Layout, Menu, Popover } from "antd";
import {
  Bell,
  Container,
  Image,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  MessageSquareReply,
  Plus,
  Settings,
  ShieldPlus,
  ShoppingCart,
  SquareMenu,
  Tag,
  Users,
} from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { isLoggedIn, removeUserInfo } from "@/redux/services/auth.service";
import { authKey } from "@/constants/storageKey";
import {
  useMyProfileQuery,
  useNotificationsQuery,
} from "@/redux/slices/admin/settingApi";
import { imageURL, socketURL } from "@/redux/api/baseApi";
const { Header, Sider, Content } = Layout;
import io from "socket.io-client";
import { useEffect } from "react";

const menuItems = [
  {
    path: "/",
    title: "Dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    path: "/product-management",
    title: "Product Management",
    icon: <ShoppingCart size={18} />,
  },
  {
    path: "/add-product",
    title: "Add Products",
    icon: <Plus size={18} />,
  },
  {
    path: "/order-management",
    title: "Order Management",
    icon: <ListOrdered size={18} />,
  },
  {
    path: "/user-management",
    title: "User Management",
    icon: <Users size={18} />,
  },
  {
    path: "/categories",
    title: "Categories",
    icon: <SquareMenu size={18} color="#fff" />,
    subMenu: [
      {
        path: "/category",
        title: "Categories",
        icon: "",
      },
      {
        path: "/sub-category",
        title: "Sub Category",
        icon: "",
      },
    ],
  },
  {
    path: "/create-offer",
    title: "Create Offer",
    icon: <Tag size={18} />,
  },
  {
    path: "/promo-code",
    title: "Promo Code",
    icon: <Container size={18} />,
  },
  {
    path: "/feedback",
    title: "Feedback",
    icon: <MessageSquareReply size={18} />,
  },

  {
    path: "/settings",
    title: "Settings",
    icon: <Settings size={18} color="#fff" />,
    subMenu: [
      {
        path: "/terms-and-conditions",
        title: "Terms and Conditions",
        icon: "",
      },
      {
        path: "/privacy-policy",
        title: "Privacy Policy",
        icon: "",
      },
      {
        path: "/about",
        title: "About",
        icon: "",
      },
      {
        path: "/faq",
        title: "FAQ",
        icon: "",
      },
      {
        path: "/profile",
        title: "Profile",
        icon: "",
      },
      {
        path: "/change-password",
        title: "Change password",
        icon: "",
      },
    ],
  },
  {
    path: "/make-admin",
    title: "Make Admin",
    icon: <ShieldPlus size={18} />,
  },
  {
    path: "/cover",
    title: "Cover Page",
    icon: <Image size={18} />,
  },
];

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
const { SubMenu } = Menu;

const Dashboard = () => {
  const navigate = useNavigate();
  const isUser = isLoggedIn();
  if (!isUser) {
    navigate("/auth/login");
  }

  const { data: notifications, refetch } = useNotificationsQuery({});
  const { data: userData } = useMyProfileQuery({});
  const myProfile = userData?.data;

  useEffect(() => {
    const socket = io(socketURL);

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("notification", (notification) => {
      console.log("New notification:", notification);
      refetch();
    });

    return () => {
      socket.disconnect();
    };
  }, [isUser, navigate, refetch]);

  if (!isUser) {
    navigate("/auth/login");
  }
  const handleLogout = () => {
    removeUserInfo(authKey);
    navigate("/auth/login");
  };
  return (
    <Layout>
      <Sider
        width={300}
        className="sidebar-menu"
        style={{
          overflow: "auto",
          height: "100vh",
          zIndex: 2,
          backgroundColor: "#5B52A3",
        }}
        trigger={null}
      >
        <img src={logo} alt="" className="mx-auto mb-8 mt-5" />
        <Menu
          mode="inline"
          style={{ background: "#5B52A3", color: "white" }}
          defaultSelectedKeys={["1"]}
        >
          {menuItems.map((item, index) =>
            item.subMenu ? (
              <SubMenu
                key={`sub-${index}`}
                icon={item.icon}
                style={{ color: "#fff", fontSize: "16px" }}
                title={item.title}
              >
                {item.subMenu.map((subItem, subIndex) => (
                  <Menu.Item
                    key={`sub-${index}-${subIndex}`}
                    icon={subItem.icon}
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      marginBottom: "10px",
                    }}
                  >
                    <Link to={`${item.path}${subItem.path}`}>
                      {subItem.title}
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item
                key={`item-${index}`}
                icon={item.icon}
                style={{
                  color: "#fff",
                  fontSize: "16px",
                  marginBottom: "10px",
                }}
              >
                <Link to={item.path}>{item.title}</Link>
              </Menu.Item>
            )
          )}
          <Menu.Item
            key="500"
            className=""
            icon={<LogOut size={20} />}
            style={{ color: "#fff", fontSize: "16px" }}
            onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#5B52A3",
            height: "80px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div className="flex items-center gap-5">
            <Badge count={notifications?.data?.length}>
              <Bell size={30} color="#fff" />
            </Badge>
            <Popover placement="bottom" title="Hello" content={content}>
              <div className="flex items-center gap-2">
                <Avatar
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#87d068",
                  }}
                  src={`${imageURL}/${myProfile?.profileImage}`}
                  // icon={<User size={25} />}
                />
                <h2 className="text-lg text-white">{myProfile?.name}</h2>
              </div>
            </Popover>
          </div>
        </Header>
        <Content
          style={{
            background: "#cec9ff",
            height: `calc(100vh - 80px)`,
          }}
        >
          <div className="bg-white h-[calc(100vh-100px)] m-2 rounded p-3  overflow-y-auto">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
