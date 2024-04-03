/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { Select, Table } from "antd";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import image from "../assets/vegetable.png";

const data = [...Array(50).keys()].map((index) => ({
  sNo: `${index}-INV001"`,
  image: <img src={image} className="w-16" />,
  name: 500,
  validityDate: "24-5-2024",
  action: "",
}));

const offers = ["Eid", "Big seal"];

const CoverPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [offer, setOffer] = useState("Eid");
  const pageSize = 10;
  const columns = [
    {
      title: "S.NO",
      dataIndex: "sNo",
      key: "sNo",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      render: (_, data) => (
        <div className="flex items-center gap-2 justify-end">
          <button className="text-primary">
            <Edit />
          </button>
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

  const handleOffer = (value) => {
    setOffer(value);
  };

  return (
    <div>
      <Title>Cover Page</Title>
      <div className="flex justify-between items-center mb-10 mt-4">
        <Select
          defaultValue={offer}
          style={{ width: 150, height: "45px" }}
          onChange={handleOffer}
          options={offers.map((offer) => ({
            label: offer,
            value: offer,
          }))}
        />
        <Button icon={<Plus size={20} />}>Create Promo Code</Button>
      </div>
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
    </div>
  );
};

export default CoverPage;
