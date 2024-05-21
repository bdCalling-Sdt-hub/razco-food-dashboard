import AdminModel from "@/components/MakeAdmin/AdminModel";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";

import {
  useDeleteAdminMutation,
  useGetAllAdminsQuery,
} from "@/redux/slices/admin/adminManageApi";
import { Table } from "antd";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const MakeAdmin = () => {
  //! Query
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  // set query for filter and search
  query["limit"] = size;
  query["page"] = page;
  const { data: adminData } = useGetAllAdminsQuery<Record<string, any>>({
    ...query,
  });

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const [deleteAdmin, { isSuccess, error, data }] = useDeleteAdminMutation();
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        alert("Admin Delete Successfully");
        setOpen(false);
      }
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;

        alert(errorData.data.message);
      } else {
        console.error("Login error:", error);
      }
    }
  }, [data, error, isSuccess, setOpen]);

  const columns = [
    {
      title: "S.NO",
      dataIndex: "sNo",
      key: "sNo",
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Type",
      dataIndex: "role",
      key: "userType",
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, data: any) => (
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => handleDelete(data?._id)}
            className="text-red-500"
          >
            <Trash2 />
          </button>
        </div>
      ),
    },
  ];

  const handlePageChange = (page: number, pageSize?: number) => {
    setPage(page);
    if (pageSize) {
      setSize(pageSize);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteAdmin(id);
    } catch (error: any) {
      console.error(error.message);
    }
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
        dataSource={adminData?.data?.data}
        columns={columns}
        pagination={{
          pageSize: size,
          total: adminData?.data?.pagination?.total,
          current: page,
          onChange: handlePageChange,
          showSizeChanger: true,
        }}
      />
      <AdminModel open={open} setOpen={setOpen} />
    </div>
  );
};

export default MakeAdmin;
