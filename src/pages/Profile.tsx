import { Edit } from "lucide-react";
import { useState } from "react";

import { Button, Col, Form, Input, Row } from "antd";

const Profile = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const initialFormValues = {
    name: "Nadir on the go",
    email: "nadir@gmail.com",
    phoneNumber: "4651261025",
    dateOfBirth: "25-4-2003",
    location: "Banasree,Dahaka",
  };

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
        <h2 className="text-2xl mt-2">Pirates</h2>
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
                <Form.Item label="Phone Number" name="phoneNumber">
                  <Input size="large" readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Date of birth" name="dateOfBirth">
                  <Input size="large" readOnly />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Location" name="location">
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
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Phone Number" name="phoneNumber">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Date of birth" name="dateOfBirth">
                  <Input size="large" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Location" name="location">
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
                Save changes
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Profile;
