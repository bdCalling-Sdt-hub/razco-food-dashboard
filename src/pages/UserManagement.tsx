import Title from "@/components/share/Title";
import {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
} from "@/redux/slices/admin/userManageApi";
import { Input, Select, Table } from "antd";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const statusTypes = ["active", "deactive"];

const UserManagement = () => {
  //! Query
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  // set query for filter and search
  query["limit"] = size;
  query["page"] = page;

  const { data: usersData } = useGetUsersQuery<Record<string, any>>({
    ...query,
  });
  const data = usersData?.data?.data;
  const [updateUserStatus, { error, isSuccess }] =
    useUpdateUserStatusMutation();
  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        alert(errorData.data.message);
      } else {
        console.error("Login error:", error);
      }
    }
  }, [error, isSuccess]);
  const handleOnchange = async (e: string, id: string) => {
    try {
      const res = await updateUserStatus({ status: e, _id: id });
      if (res?.data?.success === true) {
        alert("Status Updated");
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

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
      render: (_: any, data: any) => (
        <div className="text-right">
          <Select
            defaultValue={data.status}
            onChange={(e) => handleOnchange(e, data?._id)}
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

  const handlePageChange = (page: number, pageSize?: number) => {
    setPage(page);
    if (pageSize) {
      setSize(pageSize);
    }
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
          pageSize: size,
          total: usersData?.data?.pagination?.total,
          current: page,
          onChange: handlePageChange,
          showSizeChanger: true,
        }}
      />
    </div>
  );
};

export default UserManagement;
