import Dashboard from "@/layout/Dasboard/Dashboard";
import AddProduct from "@/pages/AddProduct";
import Category from "@/pages/Category";
import CreateOffer from "@/pages/CreateOffer";
import DashboardHome from "@/pages/DashboardHome";
import Feedback from "@/pages/Feedback";
import MakeAdmin from "@/pages/MakeAdmin";
import OrderManagement from "@/pages/OrderManagement";
import ProductManagement from "@/pages/ProductManagement";
import PromoCode from "@/pages/PromoCode";
import Settings from "@/pages/Settings";

import SubCategory from "@/pages/SubCategory";
import UserManagement from "@/pages/UserManagement";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <DashboardHome />,
      },
      {
        path: "/product-management",
        element: <ProductManagement />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
      {
        path: "/order-management",
        element: <OrderManagement />,
      },
      {
        path: "/user-management",
        element: <UserManagement />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/sub-category",
        element: <SubCategory />,
      },
      {
        path: "/create-offer",
        element: <CreateOffer />,
      },
      {
        path: "/promo-code",
        element: <PromoCode />,
      },
      {
        path: "/feedback",
        element: <Feedback />,
      },
      {
        path: "/make-admin",
        element: <MakeAdmin />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;
