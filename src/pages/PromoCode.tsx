import PromoCodeModel from "@/components/PromoCode/PromoCodeModel";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import {
  useDeleteCouponMutation,
  useGetCouponsQuery,
} from "@/redux/slices/admin/couponApi";
import { Table } from "antd";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const PromoCode = () => {
  //! Query
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  // set query for filter and search
  query["limit"] = size;
  query["page"] = page;

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const { data: couponData } = useGetCouponsQuery<Record<string, any>>({});

  const data = couponData?.data?.data;
  const [deleteCoupon, { isSuccess, error }] = useDeleteCouponMutation();
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
      title: "Coupon Name",
      dataIndex: "couponCode",
      key: "couponCode",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Validity Date",
      dataIndex: "validityDate",
      key: "validityDate",
    },
    {
      title: "Target Points",
      dataIndex: "targetPoints",
      key: "targetPoints",
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, data: any) => (
        <div className="flex items-center gap-2 justify-end">
          <button onClick={showModal} className="text-primary">
            <Edit />
          </button>
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
      await deleteCoupon(id);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <div>
      <Title>Manage Promo Code</Title>
      <div className="flex justify-between items-center mb-10 mt-4">
        <Button onClick={showModal} icon={<Plus size={20} />}>
          Create Promo Code
        </Button>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          pageSize: size,
          total: couponData?.data?.pagination?.total,
          current: page,
          onChange: handlePageChange,
          showSizeChanger: true,
        }}
      />
      <PromoCodeModel open={open} setOpen={setOpen} />
    </div>
  );
};

export default PromoCode;
