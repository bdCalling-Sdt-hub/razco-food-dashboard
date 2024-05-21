import { Edit } from "lucide-react";
import { useEffect, useState } from "react";

import { Button, Col, Form, Input, Row } from "antd";
import {
  useMyProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/slices/admin/settingApi";

const Profile = () => {
  const [openEdit, setOpenEdit] = useState(false);
  // const [image, setImage] = useState(null);

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
      const res = await updateProfile({
        name: values?.name,
        phone: values?.phone,
        address: values?.address,
        gender: values?.gender,
      });

      if (res?.data?.success === true) {
        alert("Profile Update Successful");
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  // console.log(initialFormValues);
  // const initialFormValues = {
  //   name: "Nadir on the go",
  //   email: "nadir@gmail.com",
  //   phoneNumber: "4651261025",
  //   dateOfBirth: "25-4-2003",
  //   location: "Banasree,Dahaka",
  // };

  return (
    <div className="w-2/4 mx-auto">
      <div className="text-center bg-base p-4 rounded">
        {!openEdit && (
          <div className="flex justify-end">
            <button className="text-primary" onClick={() => setOpenEdit(true)}>
              <Edit size={20} />
            </button>
          </div>
        )}
        <img
          src="https://i.ibb.co/cXq8yDY/destination-italiy-single3.jpg"
          alt=""
          className="w-28 h-28 rounded-full inline-block"
        />
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
          //edit section
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
