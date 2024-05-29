import CoverModel from "@/components/CoverPage/CoverModel";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { Table } from "antd";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import {
  useDeleteCoverMutation,
  useGetCoversQuery,
} from "@/redux/slices/admin/coverApi";
import { imageURL } from "@/redux/api/baseApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const CoverPage = () => {
  //! Query
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(3);
  // set query for filter and search
  query["limit"] = size;
  query["page"] = page;
  const [open, setOpen] = useState(false);
  const [selectedCover, setSelectedCover] = useState(null);
  const { data: coverData } = useGetCoversQuery<Record<string, any>>({
    ...query,
  });

  const newData = coverData?.data?.data.map((item: any, index: number) => ({
    sNo: `${index + 1}`,
    bannerName: item?.bannerName,
    bannerImage: (
      <img
        style={{
          width: 200,
          height: 80,
          borderRadius: 10,
        }}
        src={`${imageURL}/${item?.bannerImage}`}
        alt={item?.bannerName}
      />
    ),
    validityDate: 5,
    action: item,
  }));

  const [deleteCover, { isSuccess, error, data }] = useDeleteCoverMutation();
  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorData = error as any;

        toast.error(errorData.data.message);
      } else {
        toast.error(`Login error:${error}`);
      }
    }
  }, [data, error, isSuccess, setOpen]);
  const showModal = () => {
    setOpen(true);
  };

  const columns = [
    {
      title: "S.NO",
      dataIndex: "sNo",
      key: "sNo",
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: "image",
      dataIndex: "bannerImage",
      key: "bannerImage",
    },
    {
      title: "Name",
      dataIndex: "bannerName",
      key: "bannerName",
    },
    {
      title: "Validity Date",
      dataIndex: "validityDate",
      key: "validityDate",
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, data: any) => (
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => showEditModal(data.action)}
            className="text-primary"
          >
            <Edit />
          </button>
          <button
            onClick={() => handleDelete(data?.action?._id)}
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
  const showEditModal = (offer: any) => {
    setSelectedCover(offer);
    setOpen(true);
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
        await deleteCover(id);
        Swal.fire("Deleted!", "The feedback has been deleted.", "success");
      } catch (error: any) {
        console.error(error.message);
        Swal.fire(
          "Error!",
          "There was an error deleting the feedback.",
          "error"
        );
      }
    }
  };

  return (
    <div>
      
      <div className="flex  justify-between items-center mb-6 mt-4">
        <Title>Cover Page</Title>
        <Button className="w-[140px]" onClick={showModal} icon={<Plus size={20}  />}>
          Add Cover
        </Button>
      </div>
      <Table
        dataSource={newData}
        columns={columns}
        pagination={{
          pageSize: size,
          total: coverData?.data?.pagination?.total,
          current: page,
          onChange: handlePageChange,
          showSizeChanger: true,
        }}
      />
      <CoverModel open={open} setOpen={setOpen} cover={selectedCover} />
    </div>
  );
};

export default CoverPage;
