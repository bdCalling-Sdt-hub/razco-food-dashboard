import Title from "@/components/share/Title";
import { Button, Col, Form, Input, Row, Select, Upload } from "antd";
import { Plus } from "lucide-react";

const { Option } = Select;
const { TextArea } = Input;
const AddProduct = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const onCategoryChange = (value: any) => {
    console.log(value);
  };
  const onSubcategoryChange = (value: any) => {
    console.log(value);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const initialFormValues = {
    name: "Nadir on the go",
    email: "nadir@gmail.com",
    phoneNumber: "4651261025",
    dateOfBirth: "25-4-2003",
    location: "Banasree,Dahaka",
  };
  return (
    <div>
      <Title>Add Product</Title>
      <Form
        layout="vertical"
        initialValues={initialFormValues}
        onFinish={onFinish}
        className="mt-5 mx-28"
      >
        <Row
          gutter={{
            xs: 8,
            lg: 15,
          }}
        >
          <Col span={12}>
            <Row gutter={{ lg: 10 }}>
              <Col span={24}>
                <div>
                  <Form.Item
                    label="Upload product image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <Upload action="/upload.do" listType="picture-card">
                      <button
                        style={{
                          border: 0,
                          background: "none",
                        }}
                        type="button"
                      >
                        <Plus />
                        <div
                          style={{
                            marginTop: 8,
                          }}
                        >
                          Upload
                        </div>
                      </button>
                    </Upload>
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <Form.Item label="Validity Date" name="validityDate">
                  <Input size="large" placeholder="Enter validity date" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Quantity" name="quantity">
                  <Input size="large" placeholder="Enter quantity of product" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Weight" name="weight">
                  <Input size="large" placeholder="Weight" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Brand" name="brand">
                  <Input size="large" placeholder="Enter brand" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Description" name="description">
                  <TextArea rows={8} placeholder="Product description" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={{ lg: 10 }}>
              <Col span={24}>
                <Form.Item label="Product Name" name="productName">
                  <Input size="large" placeholder="Product Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Product ID" name="productId">
                  <Input size="large" placeholder="Enter product ID" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Barcode" name="barcode">
                  <Input size="large" placeholder="Enter barcode" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Product Price" name="price">
                  <Input size="large" placeholder="Product price" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="offer" label="Offer">
                  <Select
                    placeholder="Select a offer"
                    size="large"
                    onChange={onCategoryChange}
                  >
                    <Option value="male">Eid</Option>
                    <Option value="female">Big Deal</Option>
                    <Option value="other">Summer</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Discount" name="discountPer">
                  <Input size="large" placeholder="Discount Percentage" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Discount Price" name="discountPrice">
                  <Input size="large" placeholder="Discount price" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="category" label="Category">
                  <Select
                    placeholder="Select a category"
                    size="large"
                    onChange={onCategoryChange}
                  >
                    <Option value="male">Foods</Option>
                    <Option value="female">Vegetable</Option>
                    <Option value="other">Meat</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="subcategory" label="Sub category">
                  <Select
                    placeholder="Select a Subcategory"
                    size="large"
                    onChange={onSubcategoryChange}
                  >
                    <Option value="male">Foods</Option>
                    <Option value="female">Vegetable</Option>
                    <Option value="other">Meat</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                className="bg-secondary px-28 h-10 text-lg ml-auto block"
                htmlType="submit"
              >
                Publish
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddProduct;
