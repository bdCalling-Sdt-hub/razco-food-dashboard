/* eslint-disable @typescript-eslint/no-explicit-any */
import FeedbackModel from "@/components/Feedback/FeedbackModel";
import Title from "@/components/share/Title";
import {
  useDeleteFeedbackMutation,
  useFeedbacksQuery,
} from "@/redux/slices/admin/feedbackApi";
import { Input, Table } from "antd";
import { Reply, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "timeago.js";

const Feedback = () => {
  //! Query
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  // set query for filter and search
  query["limit"] = size;
  query["page"] = page;
  const [open, setOpen] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(
    null
  );

  const { data: feedBackData } = useFeedbacksQuery<Record<string, any>>({
    ...query,
  });
  const data = feedBackData?.data;
  const [deleteFeedback, { isSuccess, error }] = useDeleteFeedbackMutation();
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        alert("Feedback Delete Successfully");
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
  const showModal = (id: string) => {
    setSelectedFeedbackId(id);
    setOpen(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Feedback",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => format(createdAt),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, data: any) => (
        <div className="flex items-center gap-2 justify-end">
          <button
            className="flex items-center border rounded-md px-1"
            onClick={() => showModal(data?._id)}
          >
            <Reply /> {data?.status}
          </button>
        </div>
      ),
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, data: any) => (
        <div className="flex items-center gap-2 justify-end">
          <button className="text-red-500">
            <Trash2 onClick={() => handleDelete(data?._id)} />
          </button>
        </div>
      ),
    },
  ];
  const handleDelete = async (id: string) => {
    try {
      await deleteFeedback({ _id: id });
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const handlePageChange = (page: number, pageSize?: number) => {
    setPage(page);
    if (pageSize) {
      setSize(pageSize);
    }
  };

  return (
    <div>
      <Title>Feedback</Title>
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
          total: feedBackData?.data?.pagination?.total,
          current: page,
          onChange: handlePageChange,
          showSizeChanger: true,
        }}
      />
      <FeedbackModel
        open={open}
        setOpen={setOpen}
        feedbackId={selectedFeedbackId}
      />
    </div>
  );
};

export default Feedback;
