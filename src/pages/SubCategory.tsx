import SubcategoryModel from "@/components/Category/SubcategoryModel";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import {
  useDeleteSubCategoryMutation,
  useGetSubCategoriesQuery,
} from "@/redux/slices/admin/subCategoryApi";

import { Table } from "antd";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const SubCategory = () => {
  //! Query
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  // set query for filter and search
  query["limit"] = size;
  query["page"] = page;
  const [open, setOpen] = useState(false);

  const { data: subCategoryData } = useGetSubCategoriesQuery<
    Record<string, any>
  >({ ...query });
  const data = subCategoryData?.data?.data;
  const [deleteSubCategory, { isSuccess, error }] =
    useDeleteSubCategoryMutation();
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        alert("Sub Category Delete Successfully");
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

  const columns = [
    {
      title: "S.NO",
      dataIndex: "sNo",
      key: "sNo",
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: "Subcategory Name",
      dataIndex: "subcategoryName",
      key: "subcategoryName",
    },
    {
      title: "Store Products",
      dataIndex: "clickedCount",
      key: "storeProduct",
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
          <button className="text-red-500">
            <Trash2 onClick={() => handleDelete(data?._id)} />
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
      await deleteSubCategory(id);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <div>
      <Title>Sub Category Management</Title>
      <div className="flex justify-between items-center mb-10 mt-4">
        <Button onClick={showModal} icon={<Plus size={20} />}>
          Add Sub Category
        </Button>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          pageSize: size,
          total: subCategoryData?.data?.pagination?.total,
          current: page,
          onChange: handlePageChange,
          showSizeChanger: true,
        }}
      />
      <SubcategoryModel open={open} setOpen={setOpen} />
    </div>
  );
};

export default SubCategory;
