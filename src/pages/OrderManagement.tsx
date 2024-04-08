/* eslint-disable @typescript-eslint/no-explicit-any */
import Title from "@/components/share/Title";
import { Input, Select, Table } from "antd";
import { Search } from "lucide-react";
import { useState } from "react";

const data = [...Array(50).keys()].map((index) => ({
  orderNo: `${index + 1}`,
  totalItems: "Cucumber",
  price: "4564156",
  deliveryTime: "4-10-2024",
  action: "",
}));

const statusTypes = ["Pending", "Packing", "Processing", "Shipping", "Shipped"];

const OrderManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("Pending");
  const pageSize = 10;

  const columns = [
    {
      title: "Order No",
      dataIndex: "orderNo",
      key: "orderNo",
    },
    {
      title: "Total Items",
      dataIndex: "totalItems",
      key: "totalItems",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Delivery Time",
      dataIndex: "deliveryTime",
      key: "deliveryTime",
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, data: any) => (
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
      <Title>Order Management</Title>
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

export default OrderManagement;
