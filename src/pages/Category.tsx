import CategoryModel from "@/components/Category/CategoryModel";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import {
  useDeleteCategoryMutation,
  useGetCategorysQuery,
} from "@/redux/slices/admin/categoryApi";
import { Table } from "antd";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const Category = () => {
  //! Query
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  // set query for filter and search
  query["limit"] = size;
  query["page"] = page;

  const [open, setOpen] = useState(false);
  const { data: categoryData } = useGetCategorysQuery<Record<string, any>>({});

  const [deleteCategory, { isSuccess, error, data }] =
    useDeleteCategoryMutation();
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

  const columns = [
    {
      title: "S.NO",
      dataIndex: "sNo",
      key: "sNo",
      render: (text: string, record: any, index: number) => index + 1,
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
      await deleteCategory(id);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <div>
      <Title>Category Management</Title>
      <div className="flex justify-between items-center mb-10 mt-4">
        <Button onClick={showModal} icon={<Plus size={20} />}>
          Add Category
        </Button>
      </div>
      <Table
        dataSource={categoryData?.data?.data}
        columns={columns}
        pagination={{
          pageSize: size,
          total: categoryData?.data?.pagination?.total,
          current: page,
          onChange: handlePageChange,
          showSizeChanger: true,
        }}
      />
      <CategoryModel open={open} setOpen={setOpen} />
    </div>
  );
};

export default Category;
