import Title from "@/components/share/Title";
import { useGetCategorysQuery } from "@/redux/slices/admin/categoryApi";
import { useGetOffersQuery } from "@/redux/slices/admin/offerApi";
import { useAddProductMutation } from "@/redux/slices/admin/productManagementApi";
import { useGetSubCategoriesQuery } from "@/redux/slices/admin/subCategoryApi";
import { Button, Col, Form, Input, Row, Select, Upload } from "antd";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const { Option } = Select;
const { TextArea } = Input;
const AddProduct = () => {
  const [imageUrl, setImageUrl] = useState<File | null>(null);
  const { data: categoryData } = useGetCategorysQuery<Record<string, any>>({});
  const { data: offerData } = useGetOffersQuery<Record<string, any>>({});
  const { data: subCategoryData } = useGetSubCategoriesQuery<
    Record<string, any>
  >({});
  const [addProduct, { isLoading, isSuccess, error, data }] =
    useAddProductMutation();
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        alert("Product add Successfully");
      }
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        // message.error(errorData.data.message);
        alert(errorData.data.message);
      } else {
        console.error("Login error:", error);
      }
    }
  }, [data, error, isSuccess]);
  // const onFinish = async (values: any) => {
  //   try {
  //     await addProduct(values);
  //   } catch (error: any) {
  //     console.log(error?.message);
  //   }
  // };
  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("productImage", imageUrl as File);
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      await addProduct(formData);
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  const onCategoryChange = (value: any) => {
    console.log(value);
  };
  const onSubcategoryChange = (value: any) => {
    console.log(value);
  };
  const onOfferChange = (value: any) => {
    console.log(value);
  };

  const normFile = (e: any) => {
    console.log(e);
    if (Array.isArray(e)) {
      return e;
    }
    console.log(e?.fileList);
    return e?.fileList;
  };
  const handleImageChange = (info: any) => {
    // console.log(info.file?.originFileObj);
    setImageUrl(info.file?.originFileObj);
  };
  console.log(imageUrl);
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
                    <Upload
                      onChange={handleImageChange}
                      listType="picture-card"
                      name="productImage"
                    >
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
              <Col span={12}>
                <Form.Item label="Store" name="store">
                  <Input size="large" placeholder="Enter Store" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Expire Date" name="expireDate">
                  <Input size="large" placeholder="Enter Expire Date" />
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
                    onChange={onOfferChange}
                  >
                    {offerData &&
                      offerData.data.data.map((ct: any) => (
                        <Option key={ct._id} value={ct._id.toString()}>
                          {ct.offerName}
                        </Option>
                      ))}
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
                    {categoryData &&
                      categoryData.data.data.map((ct: any) => (
                        <Option key={ct._id} value={ct.categoryName}>
                          {ct.categoryName}
                        </Option>
                      ))}
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
                    {subCategoryData &&
                      subCategoryData.data.data.map((ct: any) => (
                        <Option key={ct._id} value={ct.subcategoryName}>
                          {ct.subcategoryName}
                        </Option>
                      ))}
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
                {isLoading ? "Publishing.." : "Publish"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddProduct;
