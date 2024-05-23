import SubcategoryModel from "@/components/Category/SubcategoryModel";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import {
  useDeleteSubCategoryMutation,
  useGetSubCategoriesQuery,
} from "@/redux/slices/admin/subCategoryApi";
import Swal from "sweetalert2";
import { Table } from "antd";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SubCategory = () => {
  //! Query
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  // set query for filter and search
  query["limit"] = size;
  query["page"] = page;
  const [open, setOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const { data: subCategoryData } = useGetSubCategoriesQuery<
    Record<string, any>
  >({ ...query });
  const data = subCategoryData?.data?.data;
  const [deleteSubCategory, { isSuccess, error }] =
    useDeleteSubCategoryMutation();
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
          <button onClick={() => showEditModal(data)} className="text-primary">
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
        await deleteSubCategory(id);
        Swal.fire("Deleted!", "The subcategory has been deleted.", "success");
      } catch (error: any) {
        console.error(error.message);
        Swal.fire(
          "Error!",
          "There was an error deleting the subcategory.",
          "error"
        );
      }
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
      <SubcategoryModel
        open={open}
        setOpen={setOpen}
        subCategory={selectedOffer}
      />
    </div>
  );
};

export default SubCategory;
