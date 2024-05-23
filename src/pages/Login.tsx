import AuthWrapper from "@/components/share/AuthWrapper";
import Title from "@/components/share/Title";
import { storeUserInfo } from "@/redux/services/auth.service";
import { useAdminLoginMutation } from "@/redux/slices/admin/adminManageApi";
import { Button, Checkbox, Form, Input } from "antd";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [adminLogin, { isLoading, data, isSuccess, error }] =
    useAdminLoginMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        toast.success("Login Successfully");
        storeUserInfo({ accessToken: data?.data });
        navigate("/");
      }
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;

        toast.error(errorData.data.message);
      } else {
        console.error("Login error:", error);
      }
    }
  }, [data, error, isSuccess, navigate]);
  const onFinish = async (data: any) => {
    try {
      await adminLogin(data);
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <AuthWrapper>
      <div className="text-center mb-12">
        <Title>Login</Title>
        <p>Please enter your email and password to continue</p>
      </div>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email">
          <Input placeholder="Enter your email" style={{ height: "50px" }} />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password
            placeholder="Enter your password"
            style={{ height: "50px" }}
          />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-between items-center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link className="login-form-forgot" to="/auth/forget-password">
              Forgot password
            </Link>
          </div>
        </Form.Item>
        <Form.Item>
          <Button
            className="bg-secondary h-12 text-white text-lg w-full mt-6"
            htmlType="submit"
          >
            {isLoading ? "Loading.." : "Sign In"}
          </Button>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};

export default Login;
