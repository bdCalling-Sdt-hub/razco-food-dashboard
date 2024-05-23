import Title from "@/components/share/Title";
import {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
} from "@/redux/slices/admin/userManageApi";
import { Input, Select, Table } from "antd";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const statusTypes = ["active", "deactive"];

const UserManagement = () => {
  //! Query
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [search, setSearch] = useState("");
  // set query for filter and search
  query["limit"] = size;
  query["page"] = page;
  if (search) {
    query["search"] = search;
  }
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
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (confirmation.isConfirmed) {
      try {
        const res = await updateUserStatus({ status: e, _id: id });
        if (res?.data?.success === true) {
          Swal.fire("Updated!", "The status has been updated.", "success");
        }
      } catch (error: any) {
        console.error(error?.message);
        Swal.fire("Error!", "There was an error updating the status.", "error");
      }
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
        onChange={(e) => setSearch(e.target.value)}
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
