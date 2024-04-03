import Dashboard from "@/layout/Dasboard/Dashboard";
import About from "@/pages/About";
import AddProduct from "@/pages/AddProduct";
import Category from "@/pages/Category";
import CreateOffer from "@/pages/CreateOffer";
import DashboardHome from "@/pages/DashboardHome";
import FAQPage from "@/pages/FAQ";
import Feedback from "@/pages/Feedback";
import MakeAdmin from "@/pages/MakeAdmin";
import OrderManagement from "@/pages/OrderManagement";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import ProductManagement from "@/pages/ProductManagement";
import Profile from "@/pages/Profile";
import PromoCode from "@/pages/PromoCode";
import Settings from "@/pages/Settings";

import SubCategory from "@/pages/SubCategory";
import TermsAndCondition from "@/pages/TermsAndCondition";
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
        path: "/categories/category",
        element: <Category />,
      },
      {
        path: "/categories/sub-category",
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
      {
        path: "/settings/terms-and-conditions",
        element: <TermsAndCondition />,
      },
      {
        path: "/settings/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/settings/about",
        element: <About />,
      },
      {
        path: "/settings/faq",
        element: <FAQPage />,
      },
      {
        path: "/settings/profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
