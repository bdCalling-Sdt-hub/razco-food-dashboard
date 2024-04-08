import AuthWrapper from "@/components/share/AuthWrapper";
import Title from "@/components/share/Title";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    console.log(values);
    navigate("/auth/verify");
  };
  return (
    <AuthWrapper>
      <div className="text-center mb-12">
        <Title>Forget Password</Title>
        <p>Please enter your email and click send</p>
      </div>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email">
          <Input placeholder="Enter your email" style={{ height: "50px" }} />
        </Form.Item>

        <Form.Item>
          <Button
            className="bg-secondary h-12 text-white text-lg w-full mt-6"
            htmlType="submit"
          >
            Send
          </Button>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};

export default ForgetPassword;
