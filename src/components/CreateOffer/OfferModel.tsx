import { Form, Input, Modal } from "antd";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OfferModel: React.FC<OfferModelProps> = ({ open, setOpen }) => {
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
      </Modal>
    </div>
  );
};

export default OfferModel;
