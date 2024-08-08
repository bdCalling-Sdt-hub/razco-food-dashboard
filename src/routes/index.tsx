import Auth from "@/layout/Auth/Auth";
import Dashboard from "@/layout/Dasboard/Dashboard";
import About from "@/pages/About";
import AddProduct from "@/pages/AddProduct";
import Category from "@/pages/Category";
import ChangePassword from "@/pages/ChangePassword";
import CoverPage from "@/pages/CoverPage";
import CreateOffer from "@/pages/CreateOffer";
import DashboardHome from "@/pages/DashboardHome";
import EditProduct from "@/pages/EditProduct";
import FAQPage from "@/pages/FAQ";
import Feedback from "@/pages/Feedback";
import ForgetPassword from "@/pages/ForgetPassword";
import Login from "@/pages/Login";
import MakeAdmin from "@/pages/MakeAdmin";
import NotificationList from "@/pages/Notification";
import OrderManagement from "@/pages/OrderManagement";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import ProductManagement from "@/pages/ProductManagement";
import Profile from "@/pages/Profile";
import PromoCode from "@/pages/PromoCode";
import SetNewPassword from "@/pages/SetNewPassword";
import Settings from "@/pages/Settings";

import SubCategory from "@/pages/SubCategory";
import TermsAndCondition from "@/pages/TermsAndCondition";
import UserManagement from "@/pages/UserManagement";
import VerifyEmail from "@/pages/VerifyEmail";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><Dashboard />r</PrivateRoute> ,
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
        path: "/notifications",
        element: <NotificationList />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
      {
        path: "/edit-product/:id",
        element: <EditProduct />,
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
        path: "/cover",
        element: <CoverPage />,
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
      {
        path: "/settings/change-password",
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/auth/verify",
        element: <VerifyEmail />,
      },
      {
        path: "/auth/set-new-password/:id",
        element: <SetNewPassword />,
      },
    ],
  },
]);

export default router;
