import { Table } from "antd";
import { Link } from "react-router-dom";
import Title from "../share/Title";

const data = [...Array(4).keys()].map((item, index) => ({
  productId: "INV001",
  productsName: "Cucumber",
  barcode: "4564156",
  category: "foods",
  quantity: "500gm",
  discount: "0%",
  price: "$15",
  stock: "500",
  status: "Available",
}));

const ProductList = () => {
  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Product Name",
      dataIndex: "productsName",
      key: "productsName",
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
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
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
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
          className="text-secondary text-lg hover:underline"
        >
          View all
        </Link>
      </div>
      <Table dataSource={data} columns={columns} pagination={false} />
    </div>
  );
};

export default ProductList;
