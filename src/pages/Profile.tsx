import { Edit, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
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

  const { data: profileData, isLoading: profileLoading } = useMyProfileQuery(
    {}
  );
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
  if (profileLoading) {
    return <p>Loading...</p>;
  }

  const src = profileData?.data?.profileImage?.startsWith("https")
    ? profileData?.data?.profileImage
    : `${imageURL}/${profileData?.data?.profileImage}`;

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

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    console.log(url);
  };

  return (
    <div className="w-2/4 mx-auto">
      <div className="text-center bg-base p-4 rounded">
        <div className="flex justify-end">
          {!openEdit && (
            <button
              className="text-primary"
              onClick={() => setOpenEdit(!openEdit)}
            >
              <Edit size={20} />
            </button>
          )}
        </div>
        <div className="relative w-28 h-28 mx-auto">
          {openEdit ? (
            <div>
              <input
                onChange={handleImageChange}
                type="file"
                className="hidden"
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                className="w-28 h-28 border relative cursor-pointer "
              >
                <img
                  src={imagePreview ? imagePreview : src}
                  alt=""
                  className="w-28 h-28 rounded-full "
                />
                <div className="absolute top-16 -left-2">
                  <Upload color="#fff" />
                </div>
              </label>
            </div>
          ) : (
            <img
              src={src}
              alt=""
              className="w-28 h-28 rounded-full inline-block"
            />
          )}
        </div>
        <h2 className="text-2xl mt-10">{initialFormValues?.name}</h2>
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
