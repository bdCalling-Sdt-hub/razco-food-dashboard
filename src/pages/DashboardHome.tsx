import ChartAndProductArea from "@/components/DashboardHome/ChartAndProductArea";
import EarnStatus from "@/components/DashboardHome/EarnStatus";
import ProductList from "@/components/DashboardHome/ProductList";

const DashboardHome = () => {
  return (
    <div>
      <EarnStatus />
      <ChartAndProductArea />
      <ProductList />
    </div>
  );
};

export default DashboardHome;
