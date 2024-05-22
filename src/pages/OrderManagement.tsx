import Title from "@/components/share/Title";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/slices/admin/orderManagementApi";
import { Input, Select, Table } from "antd";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
// const data = [...Array(50).keys()].map((index) => ({
//   orderNo: `${index + 1}`,
//   totalItems: "Cucumber",
//   price: "4564156",
//   deliveryTime: "4-10-2024",
//   action: "",
// }));

const statusTypes = ["Pending", "Packing", "Processing", "Shipping", "Shipped"];

const OrderManagement = () => {
  //! Query
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [search, setSearch] = useState<string>("");

  // set query for filter and search
  query["limit"] = size;
  query["page"] = page;
  if (search) {
    query["search"] = search;
  }

  const { data: ordersData } = useGetOrdersQuery<Record<string, any>>({
    ...query,
  });

  const [updateUserStatus, { error, isSuccess }] =
    useUpdateOrderStatusMutation();
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
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };
  const columns = [
    {
      title: "Order No",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Total Items",
      dataIndex: "totalItem",
      key: "totalItem",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Delivery Time",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      render: (deliveryDate: string) => formatDate(deliveryDate),
    },

    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, data: any) => (
        <div className="text-right">
          <Select
            defaultValue={data?.status}
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
      <Title>Order Management</Title>
      <Input
        prefix={<Search />}
        className="w-1/4 h-11 my-5"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table
        dataSource={ordersData?.data?.data}
        columns={columns}
        pagination={{
          pageSize: size,
          total: ordersData?.data?.pagination?.total,
          current: page,
          onChange: handlePageChange,
          showSizeChanger: true,
        }}
      />
    </div>
  );
};

export default OrderManagement;
