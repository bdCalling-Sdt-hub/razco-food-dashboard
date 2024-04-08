/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { Input, Select, Table } from "antd";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const data = [...Array(50).keys()].map((index) => ({
  productId: `${index}-INV001"`,
  productsName: "Cucumber",
  barcode: "4564156",
  category: "foods",
  quantity: "500gm",
  discount: "0%",
  price: "$15",
  stock: "500",
  status: "Available",
  action: "",
}));

const categories = ["Foods", "Bevarage", "Cold"];
const offers = ["Eid", "Big seal"];

const ProductManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("Foods");
  const [offer, setOffer] = useState("Eid");
  const pageSize = 10;
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
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, data: any) => (
        <div className="flex items-center gap-2">
          <button className="text-primary">
            <Link to="/add-product">
              <Edit />
            </Link>
          </button>
          <button className="text-red-500">
            <Trash2 />
          </button>
        </div>
      ),
    },
  ];

  const handlePage = (page: any) => {
    setCurrentPage(page);
  };

  const handleCategory = (value: any) => {
    setCategory(value);
  };
  const handleOffer = (value: any) => {
    setOffer(value);
  };

  return (
    <div>
      <Title>Product Management</Title>
      <div className="flex justify-between items-center mb-10 mt-4">
        <div className="flex items-center gap-5">
          <Input
            prefix={<Search />}
            className="w-4/4 h-11"
            placeholder="Search"
          />
          <Select
            defaultValue={category}
            style={{ width: 200, height: "45px" }}
            onChange={handleCategory}
            options={categories.map((cgt) => ({
              label: cgt,
              value: cgt,
            }))}
          />
          <Select
            defaultValue={offer}
            style={{ width: 200, height: "45px" }}
            onChange={handleOffer}
            options={offers.map((offer) => ({
              label: offer,
              value: offer,
            }))}
          />
        </div>
        <Link to="/add-product">
          <Button icon={<Plus size={18} />}>Add Product</Button>
        </Link>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          pageSize,
          total: 50,
          current: currentPage,
          onChange: handlePage,
        }}
      />
    </div>
  );
};

export default ProductManagement;
