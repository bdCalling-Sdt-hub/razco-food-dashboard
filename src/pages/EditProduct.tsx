/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react'
import Title from "@/components/share/Title";
import { Button, DatePicker, Form, Input, Select } from 'antd';
import moment from 'moment';
import { useUpdateProductMutation} from "@/redux/slices/admin/productManagementApi";
import { useNavigate, useParams } from 'react-router-dom';
import { CookingPot, Trash } from 'lucide-react';
import { imageURL } from '@/redux/api/baseApi';
import { useGetCategorysQuery } from "@/redux/slices/admin/categoryApi";
import { useGetSingleProductQuery } from "@/redux/slices/admin/productManagementApi";
import { useGetOffersQuery } from "@/redux/slices/admin/offerApi";
import { useGetSubCategoriesQuery } from "@/redux/slices/admin/subCategoryApi";
import toast from "react-hot-toast";
const { Option } = Select;

const EditProduct = ():React.JSX.Element => {
    const [fileList, setFileList] = useState<File[]>([]);
    const [imageToDelete, setImageToDelete] = useState<string[]>([]);
    const [imageList, setImageList] = useState<File[]>([]);
    const [updateProduct] = useUpdateProductMutation();
    const { data: categoryData } = useGetCategorysQuery<Record<string, any>>({});
    const { data: offerData } = useGetOffersQuery<Record<string, any>>({});
    const { data: subCategoryData } = useGetSubCategoriesQuery<Record<string, any>>({});
    const { id }  = useParams();
    const { data: product } = useGetSingleProductQuery(id);
    const navigate = useNavigate();
    const [price, setPrice] = useState<number>()
    const [selectedOffer, setSelectedOffer] = useState<{ id: string; discount: string } | null>(null);

    const [form] = Form.useForm();


    useEffect(()=>{
        if (product) {
            form.setFieldsValue(product?.data);
            setImageList([...product?.data?.productImage])
            setPrice(product?.data?.price)
        }
    }, [product, form]);



    const onFinish = async (values: any) => {
            const formData = new FormData();
            formData.append("expireDate", JSON.stringify(moment(values?.expireDates)?.format('YYYY-MM-DD')))
    
            for (const image of imageToDelete) {
                formData.append("imagesToDelete[]", image);
            }
    
            for (const image of imageList) {
                formData.append("productImage", image);
            }
    
            Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
            });

            formData.forEach((values)=>console.log(values))
    
            await updateProduct({ id: id, formData }).then((response)=>{
                if(response.data.statusCode === 200){
                    toast.success("Product updated successfully");
                    navigate("/product-management");
                }
            })
    };

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFileList([...fileList, e.target.files[0]]);
        }
    };
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageList([...imageList, e.target.files[0]]);
        }
    };
    
    const handleRemove=(id:any)=>{
        const data = fileList.filter((_item, index)=> index !== id);
        setFileList(data);
    }
    
    const handleImageRemove=(value:any)=>{
        const data = imageList.filter((item, _index)=> item !== value);
        setImageList(data);
        setImageToDelete([...imageToDelete, value]);
    }


    const handleOffer=(value: string, _option:any)=>{
        const [id, percentage] = value.split('|');
        setSelectedOffer({ id: id, discount: percentage });
    }
    
    
    useEffect(()=>{
        if (selectedOffer && price !== undefined) {
            const discount = (price  *  parseFloat(selectedOffer.discount)) / 100;
            const final = { discountPrice: price - discount };
            form.setFieldsValue(final);
        }
    }, [selectedOffer, form, price]);
    
    useEffect(()=>{
        if (selectedOffer) {
            form.setFieldsValue(selectedOffer);
        }
    }, [selectedOffer, form]);

    



    return (
        <div>
            <Title>Edit Product</Title>


            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="mt-5 mx-28 grid grid-cols-12 gap-6"
            >

                <div className='col-span-6'>
                    <div className="mb-3 w-full ">
                        <label htmlFor="" className="block mb-2">Upload product image</label>
                        {
                            imageList ?
                            <div className="flex items-center gap-4">
                                    {
                                        imageList?.map((item:any, index:number)=>{
                                        return (
                                            <div key={index} className="relative">
                                            <img
                                                src={` ${typeof item  === "object" ? URL?.createObjectURL(item) : `${imageURL}${item}` } `}
                                                className="rounded-lg w-[120px] h-[120px]"
                                                alt=""
                                            />
                                            <Trash onClick={()=>handleImageRemove(item)} size={22} color="red" className="absolute right-2 top-2 cursor-pointer"/>
                                            </div>
                                        )
                                        })
                                    }

                                    <div style={{display: imageList?.length > 2 ? "none" : "block"}}>
                                        <input
                                        onChange={handleImageChange}
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
                            :
                            <div className="flex items-center gap-4">
                                {
                                    fileList &&
                                    fileList?.map((item, index) => {
                                        return (
                                            <div key={index} className="w-[120px] h-[120px] relative">
                                                <Trash 
                                                    onClick={()=>handleRemove(index)}  
                                                    size={16} color="red" 
                                                    className="absolute right-2 top-2 cursor-pointer"
                                                />
                                                <img
                                                    src={URL?.createObjectURL(item)}
                                                    className="rounded-lg w-full h-full"
                                                    alt=""
                                                />
                                            </div>
                                        );
                                    })
                                }

                                <div style={{display: fileList?.length > 2 ? "none" : "block"}}>
                                    <input onChange={handleChangeImage} type="file" style={{ display: "none" }} id="img"/>
                                    <label 
                                        htmlFor="img" 
                                        className=" border cursor-pointer border-dashed w-[120px] h-[120px] rounded-lg flex items-center justify-center"
                                    >   
                                        Upload
                                    </label>
                                </div>
                            </div>
                        }
                    </div>
                    
                    <Form.Item 
                        label="Validity Date" 
                        name="expireDates"
                        className='col-span-12'
                    >
                        <DatePicker 
                            style={{
                                width: "100%",
                                height: "48px",
                                background: "#F1F4F9",
                                border: "none",
                                borderRadius: "90px",
                                padding: "0 16px",
                                cursor: "pointer"
                            }}
                        />
                    </Form.Item>

                    <div className='grid grid-cols-12 gap-6'>
                        <Form.Item 
                            label="Weight" 
                            name="weight"
                            className='col-span-6'
                        >
                            <Input 
                                size="large" 
                                placeholder="Weight" 
                            />
                        </Form.Item>

                        <Form.Item 
                            label="Brand" 
                            name="brand"
                            className='col-span-6'
                        >
                            <Input 
                                size="large" 
                                placeholder="Enter brand" 
                            />
                        </Form.Item>
                    </div>

                    <Form.Item label="Description" name="description">
                      <Input.TextArea 
                        rows={8} 
                        placeholder="Product description"
                      />
                    </Form.Item>
                </div>

                <div className='col-span-6'>
                    <div className='grid grid-cols-12 gap-6'>
                            <Form.Item 
                                className='col-span-12' 
                                label="Product Name" 
                                name="productName"
                                style={{marginBottom: 0}}
                            >
                                <Input 
                                    size="large" 
                                    placeholder="Product Name"
                                />
                            </Form.Item>

                            <Form.Item 
                                className='col-span-6' 
                                label="Product ID" 
                                name="productId"
                                style={{marginBottom: 0}}
                            >
                                <Input 
                                    size="large" 
                                    placeholder="Enter product ID"
                                />
                            </Form.Item>

                            <Form.Item 
                                className='col-span-6' 
                                label="Barcode" 
                                name="barcode"
                                style={{marginBottom: 0}}
                            >
                                <Input 
                                    size="large" 
                                    placeholder="Enter barcode"
                                />
                            </Form.Item>

                            <Form.Item 
                                className='col-span-12' 
                                label="Store" 
                                name="store"
                                style={{marginBottom: 0}}
                            >
                                <Input 
                                    size="large" 
                                    placeholder="Enter Store"
                                />
                            </Form.Item>

                            <Form.Item 
                                className='col-span-12' 
                                label="Product Price" 
                                name="price"
                                style={{marginBottom: 0}}
                            >
                                <Input 
                                    size="large" 
                                    placeholder="Product price"
                                    onChange={(e)=>setPrice(Number(e.target.value))}
                                />
                            </Form.Item>

                            <Form.Item 
                                className='col-span-4' 
                                name="offer" 
                                label="Offer"
                                style={{marginBottom: 0}}
                            >
                                <Select
                                    placeholder="Select a offer"
                                    size="large"
                                    onChange={handleOffer}
                                >
                                    {offerData &&
                                        offerData.data.data.map((ct: any) => (
                                            <Option key={ct._id} value={`${selectedOffer ? `${ct._id}|${ct.percentage}` : `${ct._id.toString()}`}`}>
                                                {ct.offerName}
                                            </Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            

                            <Form.Item 
                                className='col-span-4' 
                                label="Discount" 
                                name="discount"
                                style={{marginBottom: 0}}
                            >
                                <Input
                                    type="number"
                                    size="large"
                                    placeholder="Discount Percentage"
                                />
                            </Form.Item>
                            

                            <Form.Item
                                className='col-span-4' 
                                label="Discount Price" 
                                name="discountPrice"
                                style={{marginBottom: 0}}
                            >
                                <Input
                                    type="number"
                                    size="large"
                                    placeholder="Discount price"
                                />
                            </Form.Item>
                            
                            <Form.Item 
                                className='col-span-6' 
                                name="category" 
                                label="Category"
                                style={{marginBottom: 0}}
                            >
                                <Select
                                    placeholder="Select a category"
                                    size="large"
                                >
                                    {
                                        categoryData &&
                                        categoryData.data.data.map((ct: any) => (
                                            <Option key={ct._id} value={ct.categoryName}>
                                            {ct.categoryName}
                                            </Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            
                            <Form.Item 
                                className='col-span-6' 
                                name="subcategory" 
                                label="Sub category"
                                style={{marginBottom: 0}}
                            >
                                <Select
                                    placeholder="Select a Subcategory"
                                    size="large"
                                >
                                    {
                                        subCategoryData &&
                                        subCategoryData.data.data.map((ct: any) => (
                                            <Option key={ct._id} value={ct.subcategoryName}>
                                                {ct.subcategoryName}
                                            </Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item className='col-span-12' style={{marginBottom: 0}}>
                                <Button
                                    type="primary"
                                    className="bg-secondary px-28 h-10 text-lg ml-auto block"
                                    htmlType="submit"
                                >
                                    {"Publish"}
                                </Button>
                            </Form.Item>
                    </div>
                </div>
            </Form>


        </div>
    )
}

export default EditProduct