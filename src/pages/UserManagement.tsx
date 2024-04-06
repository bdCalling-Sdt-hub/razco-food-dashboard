/* eslint-disable @typescript-eslint/no-explicit-any */
import Title from "@/components/share/Title";
import { Input, Select, Table } from "antd";
import { Search } from "lucide-react";
import { useState } from "react";

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

const statusTypes = ["Active", "Deactive"];

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("Active");
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
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_, data) => (
        <div className="text-right">
          <Select
            defaultValue={status}
            onChange={(e) => setStatus(e)}
            style={{ width: 100, height: "25px" }}
            options={statusTypes.map((st) => ({
              label: st,
              value: st,
            }))}
          />
        </div>
      ),
    },
  ];

  const handlePage = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Title>User Management</Title>
      <Input
        prefix={<Search />}
        className="w-1/4 h-11 my-5"
        placeholder="Search"
      />
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

export default UserManagement;
