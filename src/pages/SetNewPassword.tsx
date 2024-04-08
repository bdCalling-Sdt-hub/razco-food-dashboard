import AuthWrapper from "@/components/share/AuthWrapper";
import Title from "@/components/share/Title";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const SetNewPassword = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log(values);
    navigate("/auth/login");
  };
  return (
    <AuthWrapper>
      <div className="text-center mb-12">
        <Title>Set a new password</Title>
        <p>
          Create a new password. Ensure it differs from previous ones for
          security
        </p>
      </div>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="New password" name="password">
          <Input.Password
            placeholder="Write new password"
            style={{ height: "50px" }}
          />
        </Form.Item>
        <Form.Item label="Confirm Password" name="confirmPassword">
          <Input.Password
            placeholder="Write confirm password"
            style={{ height: "50px" }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            className="bg-secondary h-12 text-white text-lg w-full mt-6"
            htmlType="submit"
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};

export default SetNewPassword;
