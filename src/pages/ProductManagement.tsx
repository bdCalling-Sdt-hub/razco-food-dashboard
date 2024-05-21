/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { useGetCategorysQuery } from "@/redux/slices/admin/categoryApi";
import { useGetOffersQuery } from "@/redux/slices/admin/offerApi";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/slices/admin/productManagementApi";
import { Input, Select, Table } from "antd";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductManagement = () => {
  //! Query
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState("");
  const [offer, setOffer] = useState("");

  // set query for filter and search
  query["limit"] = size;
  query["page"] = page;
  if (search) {
    query["search"] = search;
  }
  if (offer) {
    query["offer"] = offer;
  }
  if (category) {
    query["category"] = category;
  }
  const { data: productData } = useGetProductsQuery<Record<string, any>>({
    ...query,
  });
  const { data: categoryData } = useGetCategorysQuery<Record<string, any>>({});
  const { data: offerData } = useGetOffersQuery<Record<string, any>>({});
  // console.log(offerData);
  const data = productData?.data?.data;

  const [deleteProduct, { isSuccess, error }] = useDeleteProductMutation();
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        alert("Admin Delete Successfully");
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
  }, [data, error, isSuccess]);

  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "store",
      key: "quantity",
    },
    {
      title: "Stock",
      dataIndex: "status",
      key: "stock",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, data: any) => (
        <div className="flex items-center gap-2">
          <button className="text-primary">
            <Link to="/add-product">
              <Edit />
            </Link>
          </button>
          <button className="text-red-500">
            <Trash2 onClick={() => handleDelete(data?._id)} />
          </button>
        </div>
      ),
    },
  ];
  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
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

  const handleCategory = (value: any) => {
    setCategory(value);
  };
  const handleOffer = (value: any) => {
    setOffer(value);
  };

  return (
    <div>
      <Title>Product Management</Title>
      <div className="flex justify-between items-center mb-10 mt-4">
        <div className="flex items-center gap-5">
          <Input
            prefix={<Search />}
            className="w-4/4 h-11"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            defaultValue={"Select Category"}
            style={{ width: 200, height: "45px" }}
            onChange={handleCategory}
            options={[
              { label: "All", value: "" },
              ...(categoryData?.data?.data.map((cgt: any) => ({
                label: cgt?.categoryName,
                value: cgt?._id,
              })) || []),
            ]}
          />
          <Select
            defaultValue="Select Offer"
            style={{ width: 200, height: "45px" }}
            onChange={handleOffer}
            options={[
              { label: "All", value: "" },
              ...(offerData?.data?.data?.map((offer: any) => ({
                label: offer?.offerName,
                value: offer?._id,
              })) || []),
            ]}
          />
        </div>
        <Link to="/add-product">
          <Button icon={<Plus size={18} />}>Add Product</Button>
        </Link>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          pageSize: size,
          total: productData?.data?.pagination?.total,
          current: page,
          onChange: handlePageChange,
          showSizeChanger: true,
        }}
      />
    </div>
  );
};

export default ProductManagement;
