import { Form, Input, Modal } from "antd";
import { Image } from "lucide-react";
import { useState } from "react";
import Button from "../share/Button";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryModel: React.FC<OfferModelProps> = ({ open, setOpen }) => {
  const [imageUrl, setImageUrl] = useState("");
  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = (valeus) => {
    console.log(valeus);
  };
  const handleImage = (e) => {
    const file = e.target.files?.[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
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
            <Input placeholder="Category name" size="large" />
          </Form.Item>
        </Form>

        <Button className="px-10 mx-auto mt-5">Save</Button>
      </Modal>
    </div>
  );
};

export default CategoryModel;
