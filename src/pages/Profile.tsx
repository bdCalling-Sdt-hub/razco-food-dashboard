import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  useMyProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/slices/admin/settingApi";
import { imageURL } from "@/redux/api/baseApi";
import toast from "react-hot-toast";

const Profile = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { data: profileData } = useMyProfileQuery({});
  const initialFormValues = profileData?.data;

  const [updateProfile, { isLoading, isSuccess, error }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        alert(errorData.data.message);
      } else {
        console.error("Login error:", error);
      }
    }
  }, [error, isSuccess]);

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      if (image) {
        formData.append("profileImage", image);
      }
      if (values?.name) {
        formData.append("name", values?.name);
      }
      if (values?.phone) {
        formData.append("phone", values?.phone);
      }
      if (values?.address) {
        formData.append("address", values?.address);
      }
      if (values?.gender) {
        formData.append("gender", values?.gender);
      }

      const res = await updateProfile(formData);

      if (res?.data?.success === true) {
        toast.success("Profile Update Successful");
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleImageChange = (info: any) => {
    if (info.file.originFileObj) {
      const file = info.file.originFileObj;
      setImage(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-2/4 mx-auto">
      <div className="text-center bg-base p-4 rounded">
        <div className="flex justify-end">
          <button
            className="text-primary"
            onClick={() => setOpenEdit(!openEdit)}
          >
            <Edit size={20} />
          </button>
        </div>
        <div className="relative w-28 h-28 mx-auto">
          <img
            src={
              imagePreview ||
              (initialFormValues?.profileImage &&
                `${imageURL}/${initialFormValues?.profileImage}`) ||
              "https://i.ibb.co/cXq8yDY/destination-italiy-single3.jpg"
            }
            alt=""
            className="w-28 h-28 rounded-full inline-block"
          />
          {openEdit && (
            <div className="absolute top-0 right-0">
              <Upload
                name="profileImage"
                showUploadList={false}
                onChange={handleImageChange}
              >
                <Button icon={<UploadOutlined />} />
              </Upload>
            </div>
          )}
        </div>
        <h2 className="text-2xl mt-2">{initialFormValues?.name}</h2>
      </div>

      <div>
        {!openEdit ? (
          <Form layout="vertical" initialValues={initialFormValues}>
            <Row
              gutter={{
                xs: 8,
                lg: 15,
              }}
            >
              <Col span={12}>
                <Form.Item label="Name" name="name">
                  <Input size="large" readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="email">
                  <Input size="large" readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Phone Number" name="phone">
                  <Input size="large" readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Date of birth" name="dateOfBirth">
                  <Input size="large" readOnly />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Location" name="address">
                  <Input size="large" readOnly />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        ) : (
          <Form
            layout="vertical"
            initialValues={initialFormValues}
            onFinish={onFinish}
          >
            <Row
              gutter={{
                xs: 8,
                lg: 15,
              }}
            >
              <Col span={12}>
                <Form.Item label="Name" name="name">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="email">
                  <Input size="large" readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Phone Number" name="phone">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Date of birth" name="dateOfBirth">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Location" name="address">
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                className="bg-secondary h-10 text-lg"
                htmlType="submit"
              >
                {isLoading ? "Saving.." : "Save changes"}
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Profile;
