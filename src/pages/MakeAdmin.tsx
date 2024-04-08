/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminModel from "@/components/MakeAdmin/AdminModel";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { Table } from "antd";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const data = [...Array(50).keys()].map((index) => ({
  sNo: `${index + 1}`,
  fullName: "Sergio Marci",
  email: "sergio@gmail.com",
  userType: "admin",
  action: "",
}));

const MakeAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const pageSize = 10;
  const columns = [
    {
      title: "S.NO",
      dataIndex: "sNo",
      key: "sNo",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Type",
      dataIndex: "userType",
      key: "userType",
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, data: any) => (
        <div className="flex items-center gap-2 justify-end">
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

  return (
    <div>
      <Title>Make Admin</Title>
      <div className="flex justify-end items-center mb-10 mt-4">
        <Button onClick={showModal} icon={<Plus size={18} />}>
          Add Admin
        </Button>
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
      <AdminModel open={open} setOpen={setOpen} />
    </div>
  );
};

export default MakeAdmin;
