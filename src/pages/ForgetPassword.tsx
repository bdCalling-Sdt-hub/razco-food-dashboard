import AuthWrapper from "@/components/share/AuthWrapper";
import Title from "@/components/share/Title";
import { useForgetPasswordMutation } from "@/redux/slices/admin/settingApi";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [forgetPassword, { error, isSuccess, data }] =
    useForgetPasswordMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        alert("Set New Password");
        navigate("/auth/verify");
      }
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;

        alert(errorData.data.message);
      } else {
        console.error("Login error:", error);
      }
    }
  }, [data, error, isSuccess, navigate]);

  const onFinish = async (values: any) => {
    try {
      localStorage.setItem("email", values?.email);
      await forgetPassword(values);
    } catch (error: any) {
      console.log(error?.message);
    }
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
