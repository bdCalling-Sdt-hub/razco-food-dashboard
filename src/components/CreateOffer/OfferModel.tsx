import { Form, Input, Modal } from "antd";
import { Image } from "lucide-react";
import { useState } from "react";
import Button from "../share/Button";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OfferModel: React.FC<OfferModelProps> = ({ open, setOpen }) => {
  const [imageUrl, setImageUrl] = useState("");
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
  };
  return (
    <div>
      <Modal
        open={open}
        title="Add Offer"
        onCancel={handleCancel}
        footer={false}
      >
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="Offers Name">
            <Input placeholder="Offer name" size="large" />
          </Form.Item>
          <Form.Item label="Offers Image">
            <Input placeholder="Offer name" size="large" />
          </Form.Item>
        </Form>
        <div>
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
        <Button className="px-10 mx-auto mt-5">Save</Button>
      </Modal>
    </div>
  );
};

export default OfferModel;
