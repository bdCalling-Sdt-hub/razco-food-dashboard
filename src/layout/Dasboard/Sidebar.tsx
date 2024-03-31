import {
  Container,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  MessageSquareReply,
  Plus,
  Settings,
  ShieldPlus,
  ShoppingCart,
  Tag,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

const Sidebar = () => {
  const menuItems = [
    {
      path: "/",
      title: "Dashboard",
      icon: <LayoutDashboard />,
    },
    {
      path: "/product-management",
      title: "Product Management",
      icon: <ShoppingCart />,
    },
    {
      path: "/add-product",
      title: "Add Products",
      icon: <Plus />,
    },
    {
      path: "/order-management",
      title: "Order Management",
      icon: <ListOrdered />,
    },
    {
      path: "/user-management",
      title: "User Management",
      icon: <Users />,
    },
    //   {
    //     path: "/category",
    //     title: <Category />,

    //   },
    //   {
    //     path: "/sub-category",
    //     title: <SubCategory />,
    //   },
    {
      path: "/create-offer",
      title: "Create Offer",
      icon: <Tag />,
    },
    {
      path: "/promo-code",
      title: "Promo Code",
      icon: <Container />,
    },
    {
      path: "/feedback",
      title: "Feedback",
      icon: <MessageSquareReply />,
    },
    {
      path: "/make-admin",
      title: "Make Admin",
      icon: <ShieldPlus />,
    },
    {
      path: "/settings",
      title: "Settings",
      icon: <Settings />,
    },
  ];
  const { pathname } = useLocation();

  return (
    <div className="col-span-2 p-6 h-screen">
      <ul className="flex flex-col h-full gap-2">
        <li>
          <Link to="/" className="mb-6 block">
            <img src={logo} className="" alt="logo" />
          </Link>
        </li>
        {menuItems.map((item, index) => (
          <li
            className={`text-[16px]  p-2 cursor-pointer rounded ${
              item.path === pathname ? "bg-secondary" : ""
            }`}
            key={index}
          >
            <Link className="flex items-center gap-2" to={item.path}>
              {item.icon}
              {item.title}
            </Link>
          </li>
        ))}
        <li className="text-lg flex items-center gap-2 mt-auto p-2 cursor-pointer rounded hover:bg-secondary duration-100">
          <LogOut />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
