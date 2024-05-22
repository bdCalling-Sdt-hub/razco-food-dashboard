import OfferModel from "@/components/CreateOffer/OfferModel";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import {
  useDeleteOfferMutation,
  useGetOffersQuery,
} from "@/redux/slices/admin/offerApi";
import { Table } from "antd";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const CreateOffer = () => {
  //! Query
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  // set query for filter and search
  query["limit"] = size;
  query["page"] = page;
  const [open, setOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const { data: offerData } = useGetOffersQuery<Record<string, any>>({
    ...query,
  });

  const data = offerData?.data?.data;

  const [deleteOffer, { isSuccess, error }] = useDeleteOfferMutation();
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        alert("Offer Delete Successfully");
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
  const showModal = () => {
    setOpen(true);
  };
  const showEditModal = (offer: any) => {
    setSelectedOffer(offer);
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
      title: "Offer Name",
      dataIndex: "offerName",
      key: "offerName",
    },
    {
      title: "Store",
      dataIndex: "percentage",
      key: "percentage",
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, data: any) => (
        <div className="flex items-center gap-2 justify-end">
          <button onClick={() => showEditModal(data)} className="text-primary">
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
      await deleteOffer(id);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <div>
      <Title>Manage Offer</Title>
      <div className="flex justify-between items-center mb-10 mt-4">
        <Button onClick={showModal} icon={<Plus size={20} />}>
          Add Offer
        </Button>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          pageSize: size,
          total: offerData?.data?.pagination?.total,
          current: page,
          onChange: handlePageChange,
          showSizeChanger: true,
        }}
      />
      <OfferModel open={open} setOpen={setOpen} offer={selectedOffer} />
    </div>
  );
};

export default CreateOffer;
