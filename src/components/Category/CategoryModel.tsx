import { Form, Input, Modal } from "antd";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../share/Button";
import { useCreateCategoryMutation } from "@/redux/slices/admin/categoryApi";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryModel: React.FC<OfferModelProps> = ({ open, setOpen }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [createCategory, { isLoading, data, isSuccess, error }] =
    useCreateCategoryMutation();
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        alert("Category add Successfully");
        setOpen(false);
      }
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        // message.error(errorData.data.message);
        alert(errorData.data.message);
      } else {
        console.error("Login error:", error);
      }
    }
  }, [data, error, isSuccess, setOpen]);
  const formData = new FormData();
  if (image) {
    formData.append("bannerImage", image);
  }
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
    if (!image) {
      alert("Please select an image");
      return;
    }

    formData.append("categoryName", categoryName);
    formData.append("categoryImage", image);

    try {
      await createCategory(formData);
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        title="Add Category"
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
