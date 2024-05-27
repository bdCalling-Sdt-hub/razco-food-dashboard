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
import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

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
    ? JSON?.parse(decodeURIComponent(productsDataString))
    : null;

  console.log(productsData);

  const navigate = useNavigate();
  const { data: subCategoryData } = useGetSubCategoriesQuery<
    Record<string, any>
  >({});
  const [addProduct, { isLoading }] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  /* useEffect(() => {
    if (productsData) {
      setImageUrl(
        productsData.productImage
          ? `${imageURL}/${productsData.productImage[0]}`
          : null
      );
    } else {
      setImageUrl(null);
    }
  }, [productsData]); */

  const [fileList, setFileList] = useState([]);
  
  const onFinish = async (values: any) => {
    try {
      console.log(fileList);
      const formData = new FormData();

      for (const image of fileList) {
        formData.append("productImage", image);
      }

      Object.keys(values).forEach((key) => {
        console.log(formData.append(key, values[key]));
      });


      formData.forEach(value => console.log(value))

      if (productsData) {
        const res = await updateProduct({ id: productsData?._id, formData });
        if (res?.data?.success === true) {
          toast.success("Product updated successfully");
          navigate("/product-management");
        }
        if (res?.error) {
          //@ts-ignore
          toast.error(res?.error?.data?.message);
        }
      } else {
        const res = await addProduct(formData);
        console.log(res)
        if (res?.data?.success === true) {
          toast.success("Product create successfully");
          navigate("/product-management");
        }
        if (res?.error) {
          //@ts-ignore
          toast.error(res?.error?.data?.message);
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

  
  
  const initialFormValues = {
    ...productsData,
    offer: productsData ? productsData.offer?._id : undefined,
  };

  

  const handleChangeImage = (e: any) => {
    setFileList([...fileList, e.target.files[0]]);
    
  };

  const handleRemove=(id:any)=>{
    const data = fileList.filter((_item, index)=> index !== id);
    setFileList(data);
  }

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
                <div className="mb-3">
                  <label htmlFor="" className="block mb-2">Upload product image</label>
                  <div className="flex items-center gap-4">
                    {}

                    {fileList &&
                      fileList?.map((item, index) => {
                        return (
                          <div key={index} className="w-[120px] h-[120px] relative">
                            <Trash onClick={()=>handleRemove(index)}  size={16} color="red" className="absolute right-2 top-2 cursor-pointer"/>
                            <img

                              src={URL?.createObjectURL(item)}
                              className="rounded-lg w-full h-full"
                              alt=""
                              />
                          </div>
                        );
                      })}

                    <div style={{display: fileList?.length > 2 ? "none" : "block"}}>
                      <input
                        onChange={handleChangeImage}
                        type="file"
                        style={{ display: "none" }}
                        id="img"
                      />
                      <label
                        htmlFor="img"
                        className=" border cursor-pointer border-dashed w-[120px] h-[120px] rounded-lg flex items-center justify-center"
                      >
                          
                        Upload
                      </label>
                    </div>
                  </div>

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
