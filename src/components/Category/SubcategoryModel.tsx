import { Form, Input, Modal, Select } from "antd";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../share/Button";
import { useGetCategorysQuery } from "@/redux/slices/admin/categoryApi";
import { useCreateSubCategoryMutation } from "@/redux/slices/admin/subCategoryApi";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubcategoryModel: React.FC<OfferModelProps> = ({ open, setOpen }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [offer, setOffer] = useState("Foods");
  const { data: categoryData } = useGetCategorysQuery<Record<string, any>>({});
  const formData = new FormData();
  const newCategories = categoryData?.data?.data;
  const [createSubCategory, { isLoading, data, error, isSuccess }] =
    useCreateSubCategoryMutation();
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        alert("Sub Category add Successfully");
        setOpen(false);
      }
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        // message.error(errorData.data.message);
        alert(errorData?.data?.message);
      } else {
        console.error("Login error:", error);
      }
    }
  }, [data, error, isSuccess, setOpen]);
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
    if (!image) {
      alert("Please select an image");
      return;
    }
    formData.append("subcategoryImage", image);
    formData.append("subcategoryName", subCategoryName);
    formData.append("category", offer);
    try {
      await createSubCategory(formData);
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        title="Add Subcategory"
        onCancel={handleCancel}
        footer={false}
      >
        <h2 className="text-md mb-2">Select Category</h2>
        <Select
          defaultValue={offer}
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
