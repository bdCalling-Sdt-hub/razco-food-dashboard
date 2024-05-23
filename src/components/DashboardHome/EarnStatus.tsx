import { useDashboardOverviewQuery } from "@/redux/slices/admin/settingApi";
import { Banknote, Box, Layers, ListTodo } from "lucide-react";

const EarnStatus = () => {
  const { data: dashboardData, isLoading } = useDashboardOverviewQuery({});

  if (isLoading) {
    return <p>Loading...</p>;
  }
  const data = dashboardData?.data?.salesOverview as any;

  const earnStatus = [
    {
      title: "Total sales",
      count: data?.totalSales,
      icon: <Layers size={30} />,
      color: "#00BAC6",
      bgColor: "#D2F6FF",
    },
    {
      title: "Total Income",
      count: data?.totalIncome,
      icon: <Banknote size={30} />,
      color: "#5664fd",
      bgColor: "#DDE0FF",
    },
    {
      title: "Complete Order",
      count: data?.totalCompleteOrders,
      icon: <Box size={30} />,
      color: "#FEC53D",
      bgColor: "#f5ead0",
    },
    {
      title: "Pending Order",
      count: data?.totalPendingOrders,
      icon: <ListTodo size={30} />,
      color: "#FFA800",
      bgColor: "#FFE3C7",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {earnStatus.map((data, index) => (
        <div
          key={index}
          className="flex items-center gap-5  p-6 rounded bg-base"
        >
          <div
            className="w-16 h-16 flex items-center justify-center rounded-full"
            style={{ background: data.bgColor, color: data.color }}
          >
            {data.icon}
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-gray-500">
              {data.count}+
            </h2>
            <h3 className="text-lg font-normal">{data.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EarnStatus;
