import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Title from "../share/Title";
import { useDashboardOverviewQuery } from "@/redux/slices/admin/settingApi";

const SealOverviewChart = () => {
  const { data: dashboardData } = useDashboardOverviewQuery<
    Record<string, any>
  >({});
  const data = dashboardData?.data?.yearlySalesOverview;
  console.log(data);
  return (
    <div className="bg-base rounded p-4">
      <Title className="font-bold mb-5">Sales Overview</Title>
      <ResponsiveContainer width="100%" className="h-[300px]" height={300}>
        <AreaChart data={data} syncId="anyId">
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalSale"
            stroke="#7CC84E"
            fill="#7CC84E"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SealOverviewChart;
