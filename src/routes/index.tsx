import Dashboard from "@/layout/Dashboard";
import DashboardHome from "@/pages/DashboardHome";
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
        element: <DashboardHome />,
      },
      {
        path: "/",
        element: <DashboardHome />,
      },
      {
        path: "/",
        element: <DashboardHome />,
      },
      {
        path: "/",
        element: <DashboardHome />,
      },
      {
        path: "/",
        element: <DashboardHome />,
      },
    ],
  },
]);

export default router;
