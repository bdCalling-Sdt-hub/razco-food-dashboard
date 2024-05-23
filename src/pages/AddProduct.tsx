/* eslint-disable @typescript-eslint/ban-ts-comment */
import Title from "@/components/share/Title";
import { imageURL } from "@/redux/api/baseApi";
import { useGetCategorysQuery } from "@/redux/slices/admin/categoryApi";
import { useGetOffersQuery } from "@/redux/slices/admin/offerApi";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "@/redux/slices/admin/productManagementApi";
import { useGetSubCategoriesQuery } from "@/redux/slices/admin/subCategoryApi";
import { Button, Col, Form, Input, Row, Select, Upload } from "antd";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const { Option } = Select;
const { TextArea } = Input;

const AddProduct = () => {
  const [imageUrl, setImageUrl] = useState<File | string | null>(null);
  const { data: categoryData } = useGetCategorysQuery<Record<string, any>>({});
  const { data: offerData } = useGetOffersQuery<Record<string, any>>({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productsDataString = searchParams.get("products");
  const productsData = productsDataString
    ? JSON.parse(decodeURIComponent(productsDataString))
    : null;

  // console.log(productsData);
  const { data: subCategoryData } = useGetSubCategoriesQuery<
    Record<string, any>
  >({});
  const [addProduct, { isLoading }] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (productsData) {
      setImageUrl(
        productsData.productImage
          ? `${imageURL}/${productsData.productImage[0]}`
          : null
      );
    } else {
      setImageUrl(null);
    }
  }, [productsData]);
  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("productImage", imageUrl as File);
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      if (productsData) {
        const res = await updateProduct({ id: productsData?._id, formData });
        if (res?.data?.success === true) {
          alert("Product updated successfully");
        }
        if (res?.error) {
          //@ts-ignore
          alert(res?.error?.data?.message);
        }
      } else {
        const res = await addProduct(formData);
        if (res?.data?.success === true) {
          alert("Product create successfully");
        }
        if (res?.error) {
          //@ts-ignore
          alert(res?.error?.data?.message);
        }
      }
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

    return e?.fileList;
  };
  const handleImageChange = (info: any) => {
    // console.log(info.file?.originFileObj);
    setImageUrl(info.file?.originFileObj);
  };
  const initialFormValues = {
    ...productsData,
    offer: productsData ? productsData.offer?._id : undefined,
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
                <Form.Item label="Quantity" name="store">
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
                <Form.Item label="Discount" name="discount">
                  <Input
                    type="number"
                    size="large"
                    placeholder="Discount Percentage"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Discount Price" name="discountPrice">
                  <Input
                    type="number"
                    size="large"
                    placeholder="Discount price"
                  />
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
