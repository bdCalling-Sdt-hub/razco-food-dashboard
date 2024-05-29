import { Table } from "antd";
import { Link } from "react-router-dom";
import Title from "../share/Title";
import { useGetProductsQuery } from "@/redux/slices/admin/productManagementApi";

const ProductList = () => {
  const { data: productsData } = useGetProductsQuery<Record<string, any>>({});

  const data = productsData?.data?.data.map((item: any, index: number) => ({
    productId: item?.productId,
    productName: item?.productName,

    category: item?.category,

    price: item?.price,
    store: item?.store,
    status: item?.status,
  }));

  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Store",
      dataIndex: "store",
      key: "store",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  return (
    <div className="bg-base rounded p-4 mt-2 ">
      <div className="flex items-center justify-between">
        <Title className="font-bold mb-5">Products List</Title>
        <Link
          to="/product-management"
          className="text-secondary hover:text-secondary text-[16px] underline hover:underline"
        >
          View all
        </Link>
      </div>
      <Table dataSource={data?.slice(0 ,4)} columns={columns} pagination={false} />
    </div>
  );
};

export default ProductList;
