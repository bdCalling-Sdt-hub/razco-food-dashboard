import Title from "@/components/share/Title";
import { useChangePasswordMutation } from "@/redux/slices/admin/settingApi";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";

const ChangePassword = () => {
  const [changePassword, { isLoading, data, isSuccess, error }] =
    useChangePasswordMutation();
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        alert("Password change Successfully");
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
  }, [data, error, isSuccess]);

  const onFinish = async (data: any) => {
    try {
      await changePassword({
        currentPassword: data?.currentPassword,
        newPassword: data?.newPassword,
        confirmPassword: data?.confirmPassword,
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-primary  p-5 rounded w-1/4 mx-auto">
        <Title className="text-center mb-5 text-white">Change password</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Current password" name="currentPassword">
            <Input size="large" />
          </Form.Item>
          <Form.Item label="New password" name="newPassword">
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Confirm password" name="confirmPassword">
            <Input size="large" />
          </Form.Item>
          <div className="text-center">
            <Form.Item>
              <Button
                type="primary"
                className="bg-secondary h-10 text-lg"
                htmlType="submit"
              >
                {isLoading ? "Changing.." : "Update password"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
