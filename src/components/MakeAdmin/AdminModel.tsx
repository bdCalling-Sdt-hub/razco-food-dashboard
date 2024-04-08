import { Form, Input, Modal } from "antd";
import Button from "../share/Button";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminModel: React.FC<OfferModelProps> = ({ open, setOpen }) => {
  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = (valeus: any) => {
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
          <Form.Item label="Full Name">
            <Input placeholder="Enter full name" size="large" />
          </Form.Item>
          <Form.Item label="Email">
            <Input placeholder="Write email" size="large" />
          </Form.Item>
          <Form.Item label="Password">
            <Input placeholder="Enter password" size="large" />
          </Form.Item>
          <Form.Item label="User Type">
            <Input placeholder="Enter user type" size="large" />
          </Form.Item>

          <Button className="px-10 mx-auto mt-5">Save</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminModel;
