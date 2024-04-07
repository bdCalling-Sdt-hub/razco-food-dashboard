import { Form, Input, Modal } from "antd";
import { useState } from "react";
import Button from "../share/Button";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PromoCodeModel: React.FC<OfferModelProps> = ({ open, setOpen }) => {
  const [imageUrl, setImageUrl] = useState("");
  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = (valeus) => {
    console.log(valeus);
  };

  return (
    <div>
      <Modal
        open={open}
        title="Create Coupon Code"
        onCancel={handleCancel}
        footer={false}
      >
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="Coupon Code">
            <Input placeholder="Enter coupon code" size="large" />
          </Form.Item>
          <Form.Item label="Discount">
            <Input placeholder="Discount percentage" size="large" />
          </Form.Item>
          <Form.Item label="Validity Date">
            <Input placeholder="Validity date" size="large" />
          </Form.Item>
          <Form.Item label="Targeted Points">
            <Input placeholder="Enter target points" size="large" />
          </Form.Item>

          <Button className="px-10 mx-auto mt-5">Save</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default PromoCodeModel;
