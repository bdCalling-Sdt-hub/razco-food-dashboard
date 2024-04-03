import SealOverviewChart from "./SealOverviewChart";
import TopProducts from "./TopProducts";

const ChartAndProductArea = () => {
  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      <SealOverviewChart />
      <TopProducts />
    </div>
  );
};

export default ChartAndProductArea;
