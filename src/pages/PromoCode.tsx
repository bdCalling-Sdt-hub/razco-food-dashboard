import PromoCodeEditModal from "@/components/PromoCode/PromoCodeEditModal";
import PromoCodeAddModel from "@/components/PromoCode/PromoCodeAddModel";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import {
  useDeleteCouponMutation,
  useGetCouponsQuery,
} from "@/redux/slices/admin/couponApi";
import { Table } from "antd";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const PromoCode = () => {
  //! Query
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  // set query for filter and search
  query["limit"] = size;
  query["page"] = page;

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const { data: couponData } = useGetCouponsQuery<Record<string, any>>({});

  const data = couponData?.data?.data;
  const [deleteCoupon, { isSuccess, error }] = useDeleteCouponMutation();


  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorData = error as any;

        toast.error(errorData.data.message);
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
      render: (_text: string, _record: any, index: number) => index + 1,
    },
    {
      title: "Coupon Name",
      dataIndex: "couponCode",
      key: "couponCode",
    },
    {
      title: "Discount",
      dataIndex: "couponDiscount",
      key: "couponDiscount",
    },
    {
      title: "Validity Date",
      dataIndex: "expireDate",
      key: "expireDate",
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
          <button onClick={() => (setSelectedOffer(data), setEditOpen(true))  } className="text-primary">
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
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmation.isConfirmed) {
      try {
        await deleteCoupon(id);
        Swal.fire("Deleted!", "The coupon has been deleted.", "success");
      } catch (error: any) {
        Swal.fire("Error!", "There was an error deleting the coupon.", "error");
      }
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-10 mt-4">
        <Title>Manage Promo Code</Title>
        <Button onClick={()=>setOpen(true)} icon={<Plus size={20} />}>
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
      <PromoCodeAddModel open={open} setOpen={setOpen} />
      <PromoCodeEditModal open={editOpen} setOpen={setEditOpen} promoData={selectedOffer} />
    </div>
  );
};

export default PromoCode;
