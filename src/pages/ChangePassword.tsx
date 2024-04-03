import Title from "@/components/share/Title";
import { Button, Form, Input } from "antd";

const ChangePassword = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-primary  p-5 rounded w-1/4 mx-auto">
        <Title className="text-center mb-5 text-white">Change password</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Current password" name="name">
            <Input size="large" />
          </Form.Item>
          <Form.Item label="New password" name="name">
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Confirm password" name="name">
            <Input size="large" />
          </Form.Item>
          <div className="text-center">
            <Form.Item>
              <Button
                type="primary"
                className="bg-secondary h-10 text-lg"
                htmlType="submit"
              >
                Update password
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
