import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 bg-primary h-screen text-white">
      <Sidebar />
      <div className="col-span-10 bg-white text-black">
        <Header />
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
