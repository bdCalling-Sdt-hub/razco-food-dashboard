/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Form, Input, Modal, Select } from "antd";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../share/Button";
import { useGetCategorysQuery } from "@/redux/slices/admin/categoryApi";
import {
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
} from "@/redux/slices/admin/subCategoryApi";
import { imageURL } from "@/redux/api/baseApi";
import toast from "react-hot-toast";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  subCategory: any;
}

const SubcategoryModel: React.FC<OfferModelProps> = ({
  open,
  setOpen,
  subCategory,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [offer, setOffer] = useState("Foods");

  const { data: categoryData } = useGetCategorysQuery<Record<string, any>>({});
  const newCategories = categoryData?.data?.data;
  const [createSubCategory, { isLoading }] = useCreateSubCategoryMutation();
  const [updateSubCategory] = useUpdateSubCategoryMutation();

  useEffect(() => {
    if (subCategory) {
      setSubCategoryName(subCategory.subcategoryName);
      setImageUrl(
        subCategory.subcategoryImage
          ? `${imageURL}/${subCategory.subcategoryImage}`
          : ""
      );
    } else {
      setSubCategoryName("");
      setImageUrl("");
      setImage(null);
    }
  }, [subCategory]);
  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = (valeus: any) => {
    console.log(valeus);
  };
  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setImage(file);
  };
  const handleOffer = (value: any) => {
    setOffer(value);
  };
  const handleSubCategory = async () => {
    if (!subCategoryName) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("subcategoryName", subCategoryName);
    if (image) {
      formData.append("subcategoryImage", image);
    }

    try {
      if (subCategory) {
        const res = await updateSubCategory({ id: subCategory?._id, formData });

        if (res?.data?.success === true) {
          toast.success("subCategory updated successfully");
        }
        if (res?.error) {
          //@ts-ignore
          toast.error(res?.error?.data?.message);
        }
      } else {
        const res = await createSubCategory(formData);
        if (res?.data?.success === true) {
          toast.success("subCategory created successfully");
        }
        if (res?.error) {
          //@ts-ignore
          toast.error(res?.error?.data?.message);
        }
      }
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        title={subCategory ? "Edit Sub Category" : "Add Subcategory"}
        onCancel={handleCancel}
        footer={false}
      >
        <h2 className="text-md mb-2">Select Category</h2>
        <Select
          defaultValue={subCategory ? subCategory?.category : offer}
          style={{ height: "40px", width: "100%" }}
          onChange={handleOffer}
          options={newCategories?.map((offer: any) => ({
            label: offer?.categoryName,
            value: offer?._id,
          }))}
        />
        <div className="my-6">
          <h2 className="text-md mb-2">Upload Image</h2>
          <input
            type="file"
            className=" hidden"
            id="image"
            onChange={handleImage}
          />
          <label
            htmlFor="image"
            className="w-full border rounded flex justify-center items-center h-36 cursor-pointer"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                className="w-full h-full object-cover rounded"
                alt=""
              />
            ) : (
              <Image size={30} />
            )}
          </label>
        </div>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="Subcategory Name">
            <Input
              onChange={(e) => setSubCategoryName(e.target.value)}
              placeholder="Category name"
              style={{ height: "45px" }}
              value={subCategoryName}
            />
          </Form.Item>
        </Form>

        <Button onClick={handleSubCategory} className="px-10 mx-auto mt-5">
          {isLoading ? "Saving.." : "Save"}
        </Button>
      </Modal>
    </div>
  );
};

export default SubcategoryModel;
