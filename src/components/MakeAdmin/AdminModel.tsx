import { Form, Input, Modal } from "antd";
import Button from "../share/Button";
import { useEffect } from "react";
import { useMakeAdminMutation } from "@/redux/slices/admin/adminManageApi";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminModel: React.FC<OfferModelProps> = ({ open, setOpen }) => {
  const [makeAdmin, { isLoading, data, isSuccess, error }] =
    useMakeAdminMutation();
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        alert("Admin add Successfully");
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

  const onFinish = async (data: any) => {
    try {
      await makeAdmin(data);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleCancel = () => {
    setOpen(false);
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
          <Form.Item name="name" label="Full Name">
            <Input placeholder="Enter full name" size="large" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input placeholder="Write email" size="large" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input placeholder="Enter password" size="large" />
          </Form.Item>
          <Form.Item label="User Type">
            <Input placeholder="Enter user type" size="large" />
          </Form.Item>

          <Button className="px-10 mx-auto mt-5">
            {isLoading ? "Saving.." : "Save"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminModel;
