/* eslint-disable @typescript-eslint/no-explicit-any */
import CategoryModel from "@/components/Category/CategoryModel";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { Select, Table } from "antd";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const data = [...Array(50).keys()].map((index) => ({
  sNo: `${index + 1}`,
  categoryName: "Foods",
  storeProduct: 500,
  subCatagories: 5,
  action: "",
}));

const categories = ["Foods", "Vegetable", "Fruits"];

const Category = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const [category, setCategory] = useState("Vegetable");
  const pageSize = 10;
  const columns = [
    {
      title: "S.NO",
      dataIndex: "sNo",
      key: "sNo",
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Store Products",
      dataIndex: "storeProduct",
      key: "storeProduct",
    },
    {
      title: "Sub Categories",
      dataIndex: "subCatagories",
      key: "subCatagories",
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

  const handleCategory = (value) => {
    setCategory(value);
  };

  return (
    <div>
      <Title>Category Management</Title>
      <div className="flex justify-between items-center mb-10 mt-4">
        <Select
          defaultValue={category}
          style={{ width: 150, height: "45px" }}
          onChange={handleCategory}
          options={categories.map((ct) => ({
            label: ct,
            value: ct,
          }))}
        />
        <Button onClick={showModal} icon={<Plus size={20} />}>
          Add Category
        </Button>
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
      <CategoryModel open={open} setOpen={setOpen} />
    </div>
  );
};

export default Category;
