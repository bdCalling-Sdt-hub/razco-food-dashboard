import { Form, Input, Modal, Select } from "antd";
import { Image } from "lucide-react";
import { useState } from "react";
import Button from "../share/Button";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const offers = ["Foods", "Vegetable", "Beverage"];
const SubcategoryModel: React.FC<OfferModelProps> = ({ open, setOpen }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [offer, setOffer] = useState("Foods");
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
  const handleOffer = (value) => {
    setOffer(value);
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
          options={offers.map((offer) => ({
            label: offer,
            value: offer,
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
            <Input placeholder="Category name" style={{ height: "45px" }} />
          </Form.Item>
        </Form>

        <Button className="px-10 mx-auto mt-5">Save</Button>
      </Modal>
    </div>
  );
};

export default SubcategoryModel;
