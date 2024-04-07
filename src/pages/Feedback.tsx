/* eslint-disable @typescript-eslint/no-explicit-any */
import FeedbackModel from "@/components/Feedback/FeedbackModel";
import Title from "@/components/share/Title";
import { Input, Table } from "antd";
import { Reply, Search, Trash2 } from "lucide-react";
import { useState } from "react";

const data = [...Array(50).keys()].map((index) => ({
  name: `${index}-Fahim"`,
  feedback: "Where then did who disporting him pleasure so sorrow none..",
  time: "8:50 AM",
  action: "",
}));

const Feedback = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const pageSize = 10;
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, data) => (
        <div className="flex items-center gap-2 justify-end">
          <button
            className="flex items-center border rounded-md px-1"
            onClick={showModal}
          >
            <Reply /> Pending
          </button>
        </div>
      ),
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_, data) => (
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
          pageSize,
          total: 50,
          current: currentPage,
          onChange: handlePage,
        }}
      />
      <FeedbackModel open={open} setOpen={setOpen} />
    </div>
  );
};

export default Feedback;
