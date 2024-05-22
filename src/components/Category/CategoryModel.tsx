/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Form, Input, Modal } from "antd";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../share/Button";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/slices/admin/categoryApi";
import { imageURL } from "@/redux/api/baseApi";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category: any;
}

const CategoryModel: React.FC<OfferModelProps> = ({
  open,
  setOpen,
  category,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [createCategory, { data, isSuccess, error }] =
    useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  useEffect(() => {
    if (category) {
      setCategoryName(category.categoryName);
      setImageUrl(
        category.categoryImage ? `${imageURL}/${category.categoryImage}` : ""
      );
    } else {
      setCategoryName("");
      setImageUrl("");
      setImage(null);
    }
  }, [category, data, error, isSuccess, setOpen]);

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
  const handleCategory = async () => {
    if (!categoryName) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("categoryName", categoryName);
    if (image) {
      formData.append("categoryImage", image);
    }

    try {
      if (category) {
        const res = await updateCategory({ id: category?._id, formData });

        if (res?.data?.success === true) {
          alert("Category updated successfully");
        }
        if (res?.error) {
          //@ts-ignore
          alert(res?.error?.data?.message);
        }
      } else {
        const res = await createCategory(formData);
        if (res?.data?.success === true) {
          alert("Category created successfully");
        }
        if (res?.error) {
          //@ts-ignore
          alert(res?.error?.data?.message);
        }
      }
      setOpen(false);
    } catch (err: any) {
      console.error(err.message);
      alert(err.message);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        title={category ? "Edit Category" : "Add Category"}
        onCancel={handleCancel}
        footer={false}
      >
        <div className="mb-8">
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
          <Form.Item label="Category Name">
            <Input
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Category name"
              size="large"
              value={categoryName}
            />
          </Form.Item>
        </Form>

        <Button onClick={handleCategory} className="px-10 mx-auto mt-5">
          Save
        </Button>
      </Modal>
    </div>
  );
};

export default CategoryModel;
